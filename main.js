const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestPayableValue = document.querySelector(".total-interest-payable .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);


// 아래에서 const myChart -> use 문제로 error, let으로 위에서 선언
let myChart;

//  https://www.chartjs.org/docs/latest/ : 차트코드 가져오기
const displayChart = (totalInterestPayableValue) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Total Interest', 'Principal Loan Amount'],
            datasets: [
                {
                data: [totalInterestPayableValue, loanAmount],
                backgroundColor: ["#e63946", "#14213d"],
                borderWidth: 0
                }]
            },
    });
};

const updateChart = (totalInterestPayableValue) => {
    myChart.data.datasets[0].data[0] = totalInterestPayableValue;
    myChart.data.datasets[0].data[1] = loanAmount;
    myChart.update();
    
};

// EMI 계산
let interest = interestRate / 12 / 100;

const calculateEMI = () => {
    let emi =
        loanAmount *
        interest *
        (Math.pow(1 + interest, loanTenure) / 
        (Math.pow(1 + interest, loanTenure) - 1));

    return emi;
};

// top 입력값에 따른 result 업데이트 값 계산
const updateData = (emi) => {
    loanEMIValue.innerHTML = Math.round(emi);

    let totalAmount = Math.round(loanTenure * emi);
    totalAmountValue.innerHTML = totalAmount;

    let totalInterestPayabl = Math.round(totalAmount - loanAmount);
    totalInterestPayableValue.innerHTML = totalInterestPayabl;

    if (myChart) {
    updateChart(totalInterestPayabl);
    }
    else {
    displayChart(totalInterestPayabl);
    }
};

// 계산하기 버튼을 누르면 refresh -> 새로 계산한 값
const refreshInputValues = () => {
    loanAmount = parseFloat(loanAmountInput.value);
    interestRate = parseFloat(interestRateInput.value);
    loanTenure = parseFloat(loanTenureInput.value);
    interest = interestRate / 12 / 100;
};

// 위에서 계산한 값을 실행시켜 업데이트!
const init = () => {
    refreshInputValues();
    let emi = calculateEMI();
    updateData(emi);
};

init();

calculateBtn.addEventListener("click", init);