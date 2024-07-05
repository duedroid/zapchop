<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  createExpense,
  getExpenseGroupDetail,
  updateExpenseGroup,
} from "../libs/supabaseClient";

const route = useRoute();
const router = useRouter();
const title = ref();
const price = ref();
const expenseGroup = ref()
const expenseGroupId = route.params.id

async function clickCreateExpense() {
  if (
    title.value === undefined ||
    price.value === undefined ||
    title.value === "" ||
    price.value === ""
  ) {
    alert("กรุณากรอกข้อมูลให้ครบ");
  } else {
    const errorCreate = await createExpense(title.value, price.value, expenseGroupId);
    if (errorCreate === null) {
      var updateData = {
        total_expense: expenseGroup.value.total_expense + price.value,
        expense_count: expenseGroup.value.expense_count + 1,
      };
      const updateError = await updateExpenseGroup(expenseGroupId, updateData);
    }

    router.push(`/expense/${expenseGroupId}`);
  }
}

onMounted(async () => {
  const data = await getExpenseGroupDetail(expenseGroupId, false)
  if (data === null) {
    alert("Expense Group Not Found");
    router.push("/");
  } else {
    expenseGroup.value = data
  }
})
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <main class="mx-4">
      <div class="text-center text-gray-900 my-4">
        <p class="text-lg font-medium">เพิ่มรายการใหม่</p>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="clickCreateExpense()">
        <div>
          <label
            for="title"
            class="block text-sm leading-6 text-gray-900"
            >รายละเอียด</label
          >
          <div class="mt-2">
            <textarea
              v-model="title"
              id="title"
              name="title"
              rows="3"
              class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            for="price"
            class="block text-sm leading-6 text-gray-900"
            >ราคา</label
          >
          <div class="mt-2">
            <input
              v-model="price"
              type="number"
              name="price"
              id="price"
              autocomplete="price"
              class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </form>
    </main>

    <footer class="h-12">
      <div class="flex justify-between mx-4">
        <button
          type="button"
          @click="router.back()"
          class="rounded-md bg-white px-4 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          กลับ
        </button>
        <button
          type="button"
          @click="clickCreateExpense()"
          class="rounded-md bg-white px-4 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          ยืนยัน
        </button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
