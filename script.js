const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx4qJQ4zCKT9ppfi6VLaLMR64V5Pk4DRknvGBDjOGdlXM_nm0nANR1oXnD7djE9ykxtyQ/exec";

const target = new Date("2026-08-14T10:10:00+03:00");

function pad(n){ return String(n).padStart(2, "0"); }

function updateCountdown(){
  const diff = target - new Date();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  if(!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  if(diff <= 0){
    const timer = document.querySelector(".timer");
    if(timer) timer.innerHTML = '<div style="grid-column:1 / -1"><b>♡</b><span>мы женимся сегодня</span></div>';
    return;
  }
  daysEl.textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
  hoursEl.textContent = pad(Math.floor((diff / (1000 * 60 * 60)) % 24));
  minutesEl.textContent = pad(Math.floor((diff / (1000 * 60)) % 60));
  secondsEl.textContent = pad(Math.floor((diff / 1000) % 60));
}

updateCountdown();
setInterval(updateCountdown, 1000);

const form = document.getElementById("rsvpForm");

if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("guestName")?.value.trim() || "";
    const companion = document.getElementById("guestCompanion")?.value.trim() || "";
    const registration = document.querySelector('input[name="registration"]:checked')?.value || "";
    const banquet = document.querySelector('input[name="banquet"]:checked')?.value || "";
    const car = [...document.querySelectorAll('input[name="car"]:checked')].map(i => i.value).join(", ");
    const carNumber = document.getElementById("carNumber")?.value.trim() || "";
    const interactive = document.querySelector('input[name="interactive"]:checked')?.value || "";
    const songs = document.getElementById("songs")?.value.trim() || "";
    const result = document.getElementById("formResult");

    if(result) result.textContent = "Отправляем...";

    body: new URLSearchParams({
  name,
  companion,
  registration,
  banquet,
  car,
  carNumber,
  interactive,
  songs
})
    });

    if(result) result.textContent = name + ", спасибо! Ваш ответ отправлен.";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".reveal, .reveal-section");
  const show = el => el.classList.add("visible");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        show(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(item => observer.observe(item));
  document.querySelectorAll(".hero .reveal").forEach((el, i) => {
    setTimeout(() => show(el), 150 + i * 150);
  });
});
