<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getExpenseGroupList } from "../libs/supabaseClient";
import { mapMonth } from "../utils/constants";

const router = useRouter();
const totalExpense = ref(0);
const expenses = ref([]);

async function getExpenseList() {
  const data = await getExpenseGroupList();

  var sumExpense = 0;
  expenses.value = data;
  expenses.value.forEach((expense) => {
    expense.date = new Date(expense.date);

    sumExpense += expense.total_expense;
  });

  totalExpense.value = sumExpense;
}

onMounted(() => {
  getExpenseList();
});
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <main class="mx-4">
      <div class="text-lg font-medium text-center text-gray-900 m-4">
        รวมรายจ่าย {{ totalExpense }} บาท
      </div>
      <div
        class="border border-t-0 border-x-0 border-gray-900/10"
        @click="router.push(`/expense/${expense.id}`)"
        v-for="expense in expenses"
      >
        <div class="py-6">
          <p class="text-gray-900">
            {{ expense.date.getDate() }}
            {{ mapMonth[expense.date.getMonth()] }}
            {{ expense.date.getFullYear() }}
          </p>
          <div class="text-gray-600 text-sm mt-2 flex justify-between">
            <p>รายจ่าย {{ expense.total_expense }} บาท</p>
            <p>{{ expense.expense_count }} รายการ</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="h-12">
      <div class="flex justify-center">
        <button
          type="button"
          @click="router.push('/group/create')"
          class="rounded-md bg-white px-4 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          เพิ่มวันที่
        </button>
      </div>
    </footer>
  </div>
</template>
