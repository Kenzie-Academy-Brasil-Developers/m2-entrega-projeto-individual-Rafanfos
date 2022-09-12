export class Toast {
  static create(text) {
    Toastify({
      text: text,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #8B0000, #B22222)",
      },
    }).showToast();
  }
}
