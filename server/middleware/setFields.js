function setNutritionFields(reqObj, dbRowObj) {
    let nutritionFields = {
    daily_steps: reqObj.dailySteps || dbRowObj.daily_steps,
    first_meal_cal: reqObj.firstMealCal || dbRowObj.first_meal_cal,
    first_meal_time: reqObj.firstMealTime || dbRowObj.first_meal_time,
    second_meal_cal: reqObj.secondMealCal || dbRowObj.second_meal_cal,
    second_meal_time: reqObj.secondMealTime || dbRowObj.second_meal_time,
    snack_cal: reqObj.snackCal || dbRowObj.snack_cal,
    exercise_cal: reqObj.exerciseCal || dbRowObj.exercise_cal,
    exercise_time: reqObj.exerciseTime || dbRowObj.exercise_time
    }
    return nutritionFields
}

function setMedicalFields(reqObj, dbRowObj) {
    let medicalFields = {
        oxygen: reqObj.oxygen || dbRowObj.oxygen,
        heart_rate: reqObj.heart_rate || dbRowObj.heart_rate,
        blood_pressure: reqObj.bloodPressure || dbRowObj.blood_pressure,
        blood_glucose: reqObj.blood_glucose || dbRowObj.blood_glucose,
        weight: reqObj.weight || dbRowObj.weight,
        morning_meds: reqObj.morning_meds || dbRowObj.morning_meds,
        noon_meds: reqObj.noon_meds || dbRowObj.noon_meds,
        evening_meds: reqObj.evening_meds || dbRowObj.evening_meds,
    }
    return medicalFields
}

module.exports = {setNutritionFields, setMedicalFields}