import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gxtowsrvserzqvnuhxic.supabase.co",
  process.env.SUPABASE_KEY
);

export async function getExpenseGroupList() {
  const { data } = await supabase
    .from("expense_group")
    .select("id, date, total_expense, expense_count")
    .order("date", { ascending: false });

  return data;
}

export async function getExpenseGroupDetail(id, withChild) {
  var select = "";
  if (withChild) {
    select = `
      id, date, total_expense, expense_count,
      expense (
        id,
        title,
        price
      )
    `;
  } else {
    select = "id, date, total_expense, expense_count";
  }

  const { data } = await supabase
    .from("expense_group")
    .select(select)
    .eq("id", id)
    .limit(1)
    .single();

  return data;
}

export async function getExpenseGroupByDate(date) {
  const { data } = await supabase
    .from("expense_group")
    .select("id")
    .eq("date", date)
    .limit(1)
    .maybeSingle();

  return data;
}

export async function createExpenseGroup(date) {
  const { data, error } = await supabase
    .from("expense_group")
    .insert({ date: date })
    .select();

  return {
    data: data,
    error: error,
  };
}

export async function updateExpenseGroup(id, updateData) {
  const { error } = await supabase
    .from("expense_group")
    .update(updateData)
    .eq("id", id);

  return error;
}

export async function getExpensePriceList(groupId) {
  const { data } = await supabase
    .from("expense")
    .select("price")
    .eq("expense_group_id", groupId);

  return data;
}

export async function getExpenseDetail(id) {
  const { data } = await supabase
    .from("expense")
    .select("id, title, price, expense_group_id")
    .eq("id", id)
    .limit(1)
    .single();

  return data;
}

export async function createExpense(title, price, groupId) {
  const { error } = await supabase.from("expense").insert({
    title: title,
    price: price,
    expense_group_id: groupId,
  });

  return error;
}

export async function updateExpense(id, updateData) {
  const { error } = await supabase
    .from("expense")
    .update(updateData)
    .eq("id", id);

  return error;
}

export async function deleteExpense(id) {
  const response = await supabase.from("expense").delete().eq("id", id);
  return response;
}
