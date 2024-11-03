
type ToastType = 'success' | 'error' | 'warning' | 'info';

const toastAlert = (message: string, type: ToastType): void => {
  console.log(`[${type.toUpperCase()}]: ${message}`);
};

export default toastAlert;
