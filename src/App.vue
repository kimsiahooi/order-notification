<template>
  <Toaster />
</template>

<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { h, onMounted, ref } from "vue";
import type { Order } from "./types/Order";
import { faker } from "@faker-js/faker";

const { toast } = useToast();

const orders = ref<Order[]>([]);

const showNotification = () => {
  const body = document.querySelector("body");
  if (orders.value.length && body?.classList.contains("home")) {
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * orders.value.length);
      const result = orders.value.find((_, index) => index === randomNumber);

      toast({
        description: h("div", { class: "flex items-center gap-3" }, [
          h(
            "div",
            null,
            h("img", {
              class: "size-16 object-cover",
              src: result?.line_items[0].image.src,
              alt: result?.line_items[0].name,
            })
          ),
          h("div", { class: "flex-1" }, [
            h(
              "p",
              null,
              `${faker.person.fullName({ sex: "female" })} just bought ${
                result?.line_items[0].name
              }.`
            ),
            h(
              "p",
              { class: "mt-2" },
              `${Math.floor(Math.random() * 8) + 2} hours ago`
            ),
          ]),
        ]),
      });
    }, 15000);
  }
};

onMounted(async () => {
  try {
    const response = await fetch(
      "https://cc.kimsiah.com/api/order-notifications?per_page=100"
    );

    if (!response.ok) {
      throw new Error("Error fetching orders");
    }

    const { data } = await response.json();

    orders.value = data;

    showNotification();
  } catch (error) {
    console.error(error);
  }
});
</script>
