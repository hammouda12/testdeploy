const path = window.location.pathname;
let bonus = "350";
if (path.includes("bonus500")) bonus = "500";
else if (path.includes("bonus350")) bonus = "350";
document.getElementById("bonus-id").innerText = `Claim Your ${bonus}%  Bonus `;

const path2 = window.location.pathname;
let deposit = "350";
if (path2.includes("bonus500")) deposit = "500";
else if (path2.includes("bonus350")) deposit = "350";
document.getElementById("deposit-id").innerText = `Deposit Bonus (${deposit}%)`;

