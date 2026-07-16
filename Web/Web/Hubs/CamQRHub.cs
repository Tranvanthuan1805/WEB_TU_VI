using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Hubs
{
    public class CamQRHub : Hub
    {
        // HashSet to store active room IDs and prevent duplicates
        private static readonly HashSet<string> ActiveRooms = new();
        private static readonly object LockObj = new();

        /// <summary>
        /// Sent by the Web Client to request QR generation.
        /// Generates a unique roomId, joins the Web Client to the room group, and broadcasts the request to CamQR_A.
        /// </summary>
        public async Task SendRequest(string requestData)
        {
            string roomId = Guid.NewGuid().ToString("N");
            
            lock (LockObj)
            {
                ActiveRooms.Add(roomId);
            }

            // Web client joins the group of their own roomId to receive the result later
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

            // Broadcast the request to CamQR_A clients
            await Clients.All.SendAsync("ReceiveRequest", roomId, requestData);

            // Echo the roomId back to the caller so they know which room they are in
            await Clients.Caller.SendAsync("RequestAcknowledged", roomId);
        }

        /// <summary>
        /// Allows a client (e.g. Web Client after a reconnect) to join a specific room group.
        /// </summary>
        public async Task JoinRoom(string roomId)
        {
            bool isValid = false;
            lock (LockObj)
            {
                isValid = ActiveRooms.Contains(roomId);
            }

            if (isValid)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
            }
        }

        /// <summary>
        /// Sent by CamQR_A to deliver the Excel result image as a Base64 string to the Web Client.
        /// </summary>
        public async Task SendResult(string roomId, string base64Image)
        {
            bool exists = false;
            lock (LockObj)
            {
                exists = ActiveRooms.Contains(roomId);
                if (exists)
                {
                    ActiveRooms.Remove(roomId);
                }
            }

            if (exists)
            {
                // Send the result to everyone in the room group (i.e. the Web Client)
                await Clients.Group(roomId).SendAsync("ReceiveResult", roomId, base64Image);
            }
        }
    }
}
