import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
  let dailyBtn = document.getElementById('dailyBtn');
  let weekBtn = document.getElementById('weeklyBtn');
  let monthBtn = document.getElementById('monthlyBtn');
  let data = [];

  async function fetchData() {
    try {
      let response = await fetch('data.json');
      let data = await response.json();
      data = data;
      console.log(data);
    } catch (error) {
      console.error('Error', error);
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

  activeButton();
  fetchData();
});
