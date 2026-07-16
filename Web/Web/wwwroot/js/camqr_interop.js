window.camQrObj = {
    reader: null,
    stream: null,
    
    // Starts the ZXing camera scanner on a video element
    startScanner: async function (videoSelector, dotNetHelper, callbackMethod) {
        try {
            if (!this.reader) {
                // Initialize ZXing Browser QRCode Reader
                this.reader = new ZXing.BrowserQRCodeReader();
            }
            const videoEl = document.querySelector(videoSelector);
            if (!videoEl) {
                console.error("Video element not found for selector: " + videoSelector);
                return false;
            }
            
            // Stop any existing stream
            this.stopScanner(videoSelector);

            // Get user media stream for webcam (rear camera if available)
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: "environment",
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            });
            
            videoEl.srcObject = this.stream;
            videoEl.setAttribute("playsinline", true);
            
            // Start listening to the stream
            await videoEl.play();
            
            // Start continuous decoding
            this.reader.decodeFromVideoElement(videoEl, (result, error) => {
                if (result) {
                    console.log("QR Code scanned successfully:", result.text);
                    dotNetHelper.invokeMethodAsync(callbackMethod, result.text);
                }
            });
            
            return true;
        } catch (err) {
            console.error("Error starting camera scanner:", err);
            return false;
        }
    },
    
    // Stops the camera scanner and releases webcam resources
    stopScanner: function (videoSelector) {
        try {
            if (this.reader) {
                this.reader.reset();
            }
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
                this.stream = null;
            }
            const videoEl = document.querySelector(videoSelector);
            if (videoEl) {
                videoEl.srcObject = null;
            }
        } catch (err) {
            console.error("Error stopping scanner:", err);
        }
    },
    
    // Generates a QR Code inside the specified container selector
    generateQR: function (containerSelector, text) {
        try {
            const container = document.querySelector(containerSelector);
            if (!container) {
                console.error("Container not found for QR generation: " + containerSelector);
                return false;
            }
            container.innerHTML = "";
            const codeWriter = new ZXing.BrowserQRCodeSvgWriter();
            codeWriter.writeToDom(container, text, 260, 260);
            return true;
        } catch (err) {
            console.error("Error generating QR:", err);
            return false;
        }
    },

    // Captures the video frame, crops the right portion (Excel) and enhances contrast
    captureAndProcessExcel: function (videoSelector) {
        try {
            const video = document.querySelector(videoSelector);
            if (!video) {
                console.error("Video element not found for capture");
                return null;
            }

            // Create temporary canvas to grab the current frame
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth || video.clientWidth || 640;
            canvas.height = video.videoHeight || video.clientHeight || 480;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Fallback image processing using Canvas 2D Context if OpenCV.js is not loaded
            if (!window.cv) {
                console.log("OpenCV.js not available, using Canvas API for image crop and contrast enhancement");
                
                // Crop the right 60% of the screen (where the Excel result is placed in TH 2 split-screen)
                const cropCanvas = document.createElement("canvas");
                const cropWidth = Math.floor(canvas.width * 0.60);
                const cropHeight = canvas.height;
                cropCanvas.width = cropWidth;
                cropCanvas.height = cropHeight;
                
                const cropCtx = cropCanvas.getContext("2d");
                // Draw starting from x = 40% of the canvas
                cropCtx.drawImage(canvas, Math.floor(canvas.width * 0.40), 0, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
                
                // Enhance contrast
                const imgData = cropCtx.getImageData(0, 0, cropWidth, cropHeight);
                const data = imgData.data;
                const contrast = 40; // Contrast value (higher = higher contrast)
                const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
                
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = factor * (data[i] - 128) + 128;     // Red
                    data[i+1] = factor * (data[i+1] - 128) + 128; // Green
                    data[i+2] = factor * (data[i+2] - 128) + 128; // Blue
                }
                cropCtx.putImageData(imgData, 0, 0);
                
                return cropCanvas.toDataURL("image/png");
            }

            // OpenCV.js execution
            console.log("Using OpenCV.js for image processing");
            let src = cv.imread(canvas);
            let dst = new cv.Mat();
            cv.cvtColor(src, src, cv.COLOR_RGBA2RGB);

            // Enhance contrast: dst = alpha * src + beta
            // alpha = 1.4 (contrast adjustment factor), beta = 15 (brightness)
            cv.convertScaleAbs(src, dst, 1.4, 15);
            
            // Crop the right 60% of the image
            const startX = Math.floor(src.cols * 0.40);
            const cropW = Math.floor(src.cols * 0.60);
            let rect = new cv.Rect(startX, 0, cropW, src.rows);
            let cropped = dst.roi(rect);
            
            // Draw cropped & processed image to canvas
            const resultCanvas = document.createElement("canvas");
            resultCanvas.width = cropped.cols;
            resultCanvas.height = cropped.rows;
            cv.imshow(resultCanvas, cropped);
            
            const base64Image = resultCanvas.toDataURL("image/png");
            
            // Clean up memory
            src.delete();
            dst.delete();
            cropped.delete();
            
            return base64Image;
        } catch (err) {
            console.error("Error capturing and processing image:", err);
            return null;
        }
    }
};
