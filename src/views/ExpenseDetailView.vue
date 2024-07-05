<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getExpenseGroupDetail,
  deleteExpense,
  updateExpenseGroup,
} from "../libs/supabaseClient";
import { mapMonth } from "../utils/constants";
import IconEdit from "../components/IconEdit.vue";
import IconX from "../components/IconX.vue";

const route = useRoute();
const router = useRouter();
const expenseGroup = ref({});

async function getExpenseDetail() {
  const data = await getExpenseGroupDetail(route.params.id, true);

  if (data === null) {
    alert("Expense Group Not Found");
    router.push("/");
  } else {
    var date = new Date(data.date);
    data.dateString = `${date.getDate()} ${
      mapMonth[date.getMonth()]
    } ${date.getFullYear()}`;

    expenseGroup.value = data;
  }
}

async function clickDeleteExpense(expense) {
  const deleteResponse = await deleteExpense(expense.id);
  if (deleteResponse.status == 204) {
    var updateData = {
      total_expense: expenseGroup.value.total_expense - expense.price,
      expense_count: expenseGroup.value.expense_count - 1,
    };
    const updateError = await updateExpenseGroup(
      expenseGroup.value.id,
      updateData
    );
  }
  router.go();
}

onMounted(() => {
  getExpenseDetail();
});
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <main class="mx-4">
      <div class="text-center text-gray-900 my-4">
        <p class="text-lg font-medium">{{ expenseGroup.dateString }}</p>
      </div>
      <div class="flex justify-between my-4 text-gray-900">
        <p>รายจ่าย {{ expenseGroup.total_expense }} บาท</p>
        <p>{{ expenseGroup.expense_count }} รายการ</p>
      </div>

      <div
        class="border border-t-0 border-x-0 border-gray-900/10"
        v-for="expense in expenseGroup.expense"
      >
        <div class="py-6 flex justify-between">
          <div>
            <p class="text-gray-900">{{ expense.title }}</p>
            <div class="text-gray-600 text-sm mt-2">
              <p>ราคา {{ expense.price }} บาท</p>
            </div>
          </div>
          <div class="text-gray-900 flex gap-4 ml-4">
            <button @click="router.push(`/expense/${expense.id}/edit`)">
              <IconEdit class="w-5" />
            </button>
            <button @click="clickDeleteExpense(expense)">
              <IconX size="6" />
            </button>
          </div>
        </div>
      </div>
    </main>

    <footer class="h-12">
      <div class="flex justify-between mx-4">
        <button
          type="button"
          @click="router.push('/')"
          class="rounded-md bg-white px-4 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          กลับ
        </button>
        <button
          type="button"
          @click="router.push(`/expense/${route.params.id}/create`)"
          class="rounded-md bg-white px-4 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          เพิ่มรายการ
        </button>
      </div>
    </footer>
  </div>
</template>
