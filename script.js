// 먹은 음식을 저장할 배열
let foods = [];

// 음식 입력 처리
const addFood = () => {
    const foodInput = document.getElementById('foodInput');
    const food = foodInput.value.trim();
    if (food !== '') {
        foods.push(food);
        const foodList = document.getElementById('foodList');
        const li = document.createElement('li');
        li.textContent = food;
        foodList.appendChild(li);
        foodInput.value = '';
    }
};

// 음식 저장 처리
const saveData = () => {
    const data = [['음식'], ...foods.map(food => [food])];
    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'food_data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// 음식 추천 처리
const recommendFood = () => {
    const currentHour = new Date().getHours();
    if (currentHour === 7) {
        const recommendation = document.getElementById('recommendation');
        if (foods.length > 0) {
            const randomIndex = Math.floor(Math.random() * foods.length);
            const recommendedFood = foods[randomIndex];
            recommendation.textContent = `오늘 아침에는 ${recommendedFood}을(를) 먹어보세요!`;
        } else {
            recommendation.textContent = '입력한 음식이 없습니다.';
        }
    } else {
        const recommendation = document.getElementById('recommendation');
        recommendation.textContent = '아직 음식 추천 시간이 아닙니다.';
    }
};

// '추가' 버튼 클릭 이벤트 처리
document.getElementById('addFoodButton').addEventListener('click', addFood);

// '저장' 버튼 클릭 이벤트 처리
document.getElementById('saveDataButton').addEventListener('click', saveData);

// 매 초마다 음식 추천 처리
setInterval(recommendFood, 1000);
