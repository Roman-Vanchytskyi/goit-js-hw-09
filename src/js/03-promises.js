import Notiflix from 'notiflix';
const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

const onSubmitClick = event => {
  event.preventDefault();
  const stepValue = Number(document.querySelector('[name="step"]').value);
  const delayValue = Number(document.querySelector('[name="delay"]').value);
  const amount = Number(document.querySelector('[name="amount"]').value);
  let delayOver = delayValue;

  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    createPromise(position, delayOver + stepValue * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  event.target.reset();
};

form.addEventListener('submit', onSubmitClick);
