<script setup>
import { ref } from "vue";

import {
  getExpenseGroupByDate,
  createExpenseGroup,
} from "../libs/supabaseClient";
import router from "../router";

const date = ref();
const resultMessage = ref();
const isResultError = ref(true);

async function pickDate() {
  const group = await getExpenseGroupByDate(date.value);
  if (group === null) {
    resultMessage.value = "ใช้วันที่ได้";
    isResultError.value = false;
  } else {
    resultMessage.value = "มีวันที่นี้แล้ว";
    isResultError.value = true;
  }
}

async function clickCreateExpenseGroup() {
  const result = await createExpenseGroup(date.value)
  console.log(result)
  if (result.error === null) {
    router.push(`/expense/${result.data[0].id}`)
  }
}
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <main class="mx-4">
      <div class="text-center text-gray-900 my-4">
        <p class="text-lg font-medium">เพิ่มวันที่</p>
      </div>

      <div>
        <input
          @input="pickDate()"
          v-model="date"
          type="date"
          placeholder="YYYY-MM-DD"
          class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <p
          class="mt-4 text-center"
          :class="isResultError ? 'text-red-500' : 'text-green-500'"
        >
          {{ resultMessage }}
        </p>
      </div>
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
          v-show="!isResultError"
          @click="clickCreateExpenseGroup()"
          class="rounded-md bg-white px-4 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          ยืนยัน
        </button>
      </div>
    </footer>
  </div>
</template>
