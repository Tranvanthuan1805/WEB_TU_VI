namespace Web.Services
{
    public class ToastService
    {
        public event Action<string, string>? OnShow;

        public void Show(string type, string message) => OnShow?.Invoke(type, message);
        public void ShowSuccess(string message) => OnShow?.Invoke("success", message);
        public void ShowError(string message) => OnShow?.Invoke("error", message);
        public void ShowWarning(string message) => OnShow?.Invoke("warning", message);
        public void ShowInfo(string message) => OnShow?.Invoke("info", message);
    }
}
