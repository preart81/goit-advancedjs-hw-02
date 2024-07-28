import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
  transitionIn: 'fadeInDown',
  transitionOut: 'fadeOut',
  icon: '',
});

const form = document.querySelector('.form');
const delayInput = form.elements.delay;
const stepInput = form.elements.step;
const amountInput = form.elements.amount;

form.addEventListener('submit', onFormSubmit);

const makePromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

function onFormSubmit(e) {
  e.preventDefault();

  const delay = Number(delayInput.value);
  const state = form.elements.state.value;

  makePromise(delay, state)
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}
