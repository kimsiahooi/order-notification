<template>
  <Toaster />
</template>

<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { h, onMounted, ref } from "vue";
import type { Order } from "./types/Order";
import { faker } from "@faker-js/faker";
import { formatDistanceToNowStrict } from "date-fns";

interface Setting {
  total: number;
  loop_time: number;
  real_data: boolean;
  is_active: boolean;
}

const { toast } = useToast();

const orders = ref<Order[]>([]);

const showNotification = (setting: Setting) => {
  const body = document.querySelector("body");
  if (
    orders.value.length &&
    body?.classList.contains("home") &&
    setting.is_active
  ) {
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * orders.value.length);
      const result = orders.value.find((_, index) => index === randomNumber);

      if (result) {
        toast({
          description: h("div", { class: "flex items-center gap-3" }, [
            h(
              "div",
              null,
              h("img", {
                class: "size-16 object-cover",
                src: result.line_items[0].image.src,
                alt: result.line_items[0].name,
              })
            ),
            h("div", { class: "flex-1" }, [
              h(
                "p",
                null,
                `${
                  setting.real_data
                    ? `${result.billing.first_name} ${result.billing.last_name}`
                    : faker.person.fullName({ sex: "female" })
                } just bought ${result.line_items[0].name}.`
              ),
              h(
                "p",
                { class: "mt-2" },
                setting.real_data
                  ? `${formatDistanceToNowStrict(result.date_created)} ago`
                  : `${Math.floor(Math.random() * 8) + 2} hours ago`
              ),
            ]),
          ]),
        });
      }
    }, setting.loop_time);
  }
};

onMounted(async () => {
  try {
    const response = await fetch(
      "https://cc.kimsiah.com/api/features/fake-notifications"
    );

    if (!response.ok) {
      throw new Error("Error fetching orders");
    }

    const { data, setting } = await response.json();

    orders.value = data;

    showNotification(setting);
  } catch (error) {
    console.error(error);
  }
});
</script>
