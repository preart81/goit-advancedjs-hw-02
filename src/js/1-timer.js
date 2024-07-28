import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, '0');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      btnStart.disabled = true;
      return;
    }
    userSelectedDate = selectedDates[0];
    btnStart.disabled = false;
  },
  onChange(selectedDates) {
    selectedDates[0] < new Date()
      ? (btnStart.disabled = true)
      : (btnStart.disabled = false);
  },
};

let userSelectedDate = null;
const btnStart = document.querySelector('[data-start]');
const datePicker = document.querySelector('#datetime-picker');

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

flatpickr('#datetime-picker', options);

const updateTimer = () => {
  let t = convertMs(userSelectedDate - new Date());
  dataDays.textContent = addLeadingZero(t.days);
  dataHours.textContent = addLeadingZero(t.hours);
  dataMinutes.textContent = addLeadingZero(t.minutes);
  dataSeconds.textContent = addLeadingZero(t.seconds);
  if (Object.values(t).some(value => value > 0)) {
    const timerId = setTimeout(updateTimer, 1000);
  } else {
    btnStart.disabled = false;
    datePicker.disabled = false;
  }
};

btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  datePicker.disabled = true;
  updateTimer();
});
