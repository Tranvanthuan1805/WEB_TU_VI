namespace Web.Services
{
    public class ConfirmDialogService
    {
        private TaskCompletionSource<bool>? _tcs;

        public event Action<ConfirmRequest>? OnShow;

        public Task<bool> ShowAsync(string title, string message, string confirmText = "Xác nhận", bool isDanger = false)
        {
            _tcs = new TaskCompletionSource<bool>();
            OnShow?.Invoke(new ConfirmRequest(title, message, confirmText, isDanger));
            return _tcs.Task;
        }

        public void Confirm(bool result)
        {
            _tcs?.TrySetResult(result);
        }
    }

    public record ConfirmRequest(string Title, string Message, string ConfirmText, bool IsDanger);
}
