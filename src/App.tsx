import React, { useState } from 'react'
import { Flame, Activity, Scale, HeartPulse, Sparkles, Plus, Trash2, Apple, Utensils, Info } from 'lucide-react'

interface FoodItem {
  id: string
  name: string
  grams: number
  caloriesPer100g: number
}

const COMMON_FOODS = [
  { name: 'Cơm trắng', caloriesPer100g: 130 },
  { name: 'Ức gà luộc', caloriesPer100g: 165 },
  { name: 'Thịt bò xào', caloriesPer100g: 220 },
  { name: 'Trứng gà luộc (1 quả ~ 50g)', caloriesPer100g: 155 },
  { name: 'Bánh mì thịt', caloriesPer100g: 260 },
  { name: 'Phở bò (tô ~ 500g)', caloriesPer100g: 80 },
  { name: 'Bún bò Huế (tô ~ 550g)', caloriesPer100g: 95 },
  { name: 'Khoai lang luộc', caloriesPer100g: 86 },
  { name: 'Chuối tiêu', caloriesPer100g: 89 },
  { name: 'Táo tây', caloriesPer100g: 52 },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<'tdee' | 'food'>('tdee')

  // TDEE State
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState<number>(24)
  const [weight, setWeight] = useState<number>(65)
  const [height, setHeight] = useState<number>(170)
  const [activity, setActivity] = useState<number>(1.375)

  // Food Tracker State
  const [foods, setFoods] = useState<FoodItem[]>([
    { id: '1', name: 'Cơm trắng', grams: 200, caloriesPer100g: 130 },
    { id: '2', name: 'Ức gà luộc', grams: 150, caloriesPer100g: 165 },
  ])
  const [newFoodName, setNewFoodName] = useState('')
  const [newFoodGrams, setNewFoodGrams] = useState(100)
  const [newFoodCalPer100g, setNewFoodCalPer100g] = useState(150)

  // BMR & TDEE Calculation (Mifflin-St Jeor)
  const bmr = Math.round(
    gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161
  )
  const tdee = Math.round(bmr * activity)
  const loseWeightCal = Math.round(tdee - 500)
  const gainWeightCal = Math.round(tdee + 500)

  // Total Calories from food
  const totalFoodCalories = foods.reduce(
    (sum, item) => sum + Math.round((item.grams * item.caloriesPer100g) / 100),
    0
  )

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFoodName.trim()) return

    setFoods([
      ...foods,
      {
        id: Date.now().toString(),
        name: newFoodName.trim(),
        grams: Number(newFoodGrams) || 0,
        caloriesPer100g: Number(newFoodCalPer100g) || 0,
      },
    ])
    setNewFoodName('')
    setNewFoodGrams(100)
  }

  const handleSelectQuickFood = (food: { name: string; caloriesPer100g: number }) => {
    setNewFoodName(food.name)
    setNewFoodCalPer100g(food.caloriesPer100g)
  }

  const handleDeleteFood = (id: string) => {
    setFoods(foods.filter((f) => f.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
              <Flame className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">CheckCalo</h1>
              <p className="text-xs text-emerald-100">Tính TDEE & Quản lý Calo hàng ngày</p>
            </div>
          </div>
          <div className="flex bg-white/15 p-1 rounded-xl backdrop-blur-xs text-sm font-medium">
            <button
              onClick={() => setActiveTab('tdee')}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                activeTab === 'tdee' ? 'bg-white text-emerald-800 shadow-xs' : 'text-white hover:bg-white/10'
              }`}
            >
              <Activity className="w-4 h-4 inline mr-1.5" />
              Tính TDEE & BMR
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                activeTab === 'food' ? 'bg-white text-emerald-800 shadow-xs' : 'text-white hover:bg-white/10'
              }`}
            >
              <Utensils className="w-4 h-4 inline mr-1.5" />
              Đo Calo Bữa Ăn
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'tdee' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-lg font-semibold text-slate-900 mb-5 flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-600" />
                Thông tin chỉ số cơ thể
              </h2>

              <div className="space-y-5">
                {/* Giới tính */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Giới tính</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-2.5 rounded-xl font-medium border text-sm transition-all ${
                        gender === 'male'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold ring-2 ring-emerald-500/20'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      👨 Nam
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-2.5 rounded-xl font-medium border text-sm transition-all ${
                        gender === 'female'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold ring-2 ring-emerald-500/20'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      👩 Nữ
                    </button>
                  </div>
                </div>

                {/* Tuổi, Cân nặng, Chiều cao */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tuổi</label>
                    <input
                      type="number"
                      min={10}
                      max={120}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Cân nặng (kg)</label>
                    <input
                      type="number"
                      min={20}
                      max={250}
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Chiều cao (cm)</label>
                    <input
                      type="number"
                      min={100}
                      max={250}
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Mức độ vận động */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Mức độ hoạt động</label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm"
                  >
                    <option value={1.2}>Ít hoặc không vận động (Dân văn phòng, ngồi nhiều)</option>
                    <option value={1.375}>Vận động nhẹ (Tập thể dục 1-3 ngày/tuần)</option>
                    <option value={1.55}>Vận động vừa (Tập thể thao 3-5 ngày/tuần)</option>
                    <option value={1.725}>Vận động nhiều (Tập nặng 6-7 ngày/tuần)</option>
                    <option value={1.9}>Vận động rất nặng (Vận động viên, lao động thể chất)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl p-6 text-white shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-emerald-100 font-medium text-sm">Nhu cầu Calo mỗi ngày (TDEE)</span>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div className="text-4xl font-extrabold tracking-tight mb-1">
                  {tdee.toLocaleString('vi-VN')} <span className="text-xl font-normal text-emerald-100">kcal</span>
                </div>
                <p className="text-xs text-emerald-100">
                  Lượng calo cần tiêu thụ để duy trì cân nặng hiện tại ({weight} kg).
                </p>

                <div className="mt-5 pt-4 border-t border-emerald-400/40 flex justify-between items-center text-sm">
                  <span className="text-emerald-100">BMR (Trao đổi chất cơ bản):</span>
                  <span className="font-semibold">{bmr.toLocaleString('vi-VN')} kcal</span>
                </div>
              </div>

              {/* Goal Recommendations */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-3">
                <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-emerald-600" />
                  Gợi ý theo mục tiêu
                </h3>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-amber-900 text-sm">Giảm cân an toàn</div>
                    <div className="text-xs text-amber-700">-0.5 kg / tuần</div>
                  </div>
                  <div className="text-right font-bold text-amber-900">
                    {loseWeightCal.toLocaleString('vi-VN')} <span className="text-xs font-normal">kcal/ngày</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-blue-900 text-sm">Tăng cân / Tăng cơ</div>
                    <div className="text-xs text-blue-700">+0.5 kg / tuần</div>
                  </div>
                  <div className="text-right font-bold text-blue-900">
                    {gainWeightCal.toLocaleString('vi-VN')} <span className="text-xs font-normal">kcal/ngày</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Food Tracker Tab */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Food Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Apple className="w-5 h-5 text-emerald-600" />
                Thêm món ăn vào danh sách
              </h2>

              {/* Quick Select */}
              <div className="mb-5">
                <span className="text-xs text-slate-500 font-medium block mb-2">Gợi ý món phổ biến:</span>
                <div className="flex flex-wrap gap-2">
                  {COMMON_FOODS.map((food, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectQuickFood(food)}
                      className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 rounded-lg transition-colors"
                    >
                      {food.name}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleAddFood} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tên món ăn</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Cơm trắng, Trứng chiên..."
                    value={newFoodName}
                    onChange={(e) => setNewFoodName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Khối lượng (gam)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newFoodGrams}
                      onChange={(e) => setNewFoodGrams(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Calo trên 100g (kcal)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={newFoodCalPer100g}
                      onChange={(e) => setNewFoodCalPer100g(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" /> Thêm vào bữa ăn
                </button>
              </form>
            </div>

            {/* Food List & Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-md">
                <div className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-semibold">
                  Tổng calo hôm nay
                </div>
                <div className="text-4xl font-extrabold text-emerald-400">
                  {totalFoodCalories.toLocaleString('vi-VN')} <span className="text-lg text-slate-300 font-normal">kcal</span>
                </div>
                <div className="mt-3 text-xs text-slate-400">
                  So với mục tiêu duy trì (TDEE):{' '}
                  <span className={totalFoodCalories > tdee ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                    {Math.round((totalFoodCalories / (tdee || 2000)) * 100)}%
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
                <h3 className="font-semibold text-slate-800 text-sm mb-3">Món đã nạp ({foods.length})</h3>

                {foods.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-sm">
                    Chưa có món nào được thêm.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {foods.map((food) => {
                      const cal = Math.round((food.grams * food.caloriesPer100g) / 100)
                      return (
                        <div key={food.id} className="py-2.5 flex items-center justify-between gap-3">
                          <div>
                            <div className="font-medium text-slate-800 text-sm">{food.name}</div>
                            <div className="text-xs text-slate-400">
                              {food.grams}g • {food.caloriesPer100g} kcal / 100g
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-700 text-sm">{cal} kcal</span>
                            <button
                              onClick={() => handleDeleteFood(food.id)}
                              className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                              title="Xóa món"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer info note */}
        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-1">
          <Info className="w-3.5 h-3.5" />
          <span>Website phục vụ tra cứu calo cá nhân • Hosted trên <strong>checkcalo.ngocthach.me</strong></span>
        </div>
      </main>
    </div>
  )
}
