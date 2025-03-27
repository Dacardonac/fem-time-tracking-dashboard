import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', async () => {
  let dailyBtn = document.getElementById('dailyBtn');
  let weekBtn = document.getElementById('weeklyBtn');
  let monthBtn = document.getElementById('monthlyBtn');
  let data = [];

  async function fetchData() {
    try {
      let response = await fetch('/data.json');
      return await response.json();
    } catch (error) {
      console.error('Error', error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Error loading data',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
    }
  }

  function activeButton() {
    const buttons = [dailyBtn, weekBtn, monthBtn];
    weekBtn.classList.add('active');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        console.log(btn.id);
      });
    });
  }

  function printCards(data, timeframe) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    data.forEach((item) => {
      const article = document.createElement('article');
      article.classList.add('card');
      article.style.backgroundColor = `var(--${item.title.toLowerCase().replace(/ /g, '-')})`;
      article.setAttribute('aria-label', `${item.title} tracking card`);

      article.innerHTML = `
        <header class="card__header">
          <img class="card__header-icon" src="/src/assets/icons/icon-${item.title.toLowerCase().replace(/ /g, '-')}.svg" alt="${item.title} icon">
        </header>
        <div class="card__content">
          <header class="card__content-header">
            <h2 class="card__content-title">${item.title}</h2>
            <button class="card__content-options" aria-label="Options">
              <img src="./src/assets/icons/icon-ellipsis.svg" alt="Ellipsis icon">
            </button>
          </header>
          <main class="card__content-details">
            <h3 class="card__content-hours">${item.timeframes[timeframe].current}hrs</h3>
            <p class="card__content-previous">Last Week - ${item.timeframes[timeframe].previous}hrs</p>
          </main>
        </div>
      `;
      container.appendChild(article);
    });
  }

  data = await fetchData();
  activeButton();
  printCards(data, 'weekly');

  dailyBtn.addEventListener('click', () => {
    printCards(data, 'daily');
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Daily data loaded',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  });
  monthBtn.addEventListener('click', () => {
    printCards(data, 'monthly');
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Monthly data loaded',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  });
  weekBtn.addEventListener('click', () => {
    printCards(data, 'weekly');
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Weekly data loaded',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  });
});
