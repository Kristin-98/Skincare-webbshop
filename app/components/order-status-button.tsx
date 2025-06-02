"use client";

import { Button } from "@mui/material";
import { OrderStatus } from "@prisma/client";
import { useState, useTransition } from "react";
import { updateOrderStatus } from "../product/[articleNumber]/[title]/product-actions";

interface OrderStatusButtonProps {
  orderNumber: string;
  initialStatus: OrderStatus;
}

export default function OrderStatusButton({
  orderNumber,
  initialStatus,
}: OrderStatusButtonProps) {
  const [currentStatus, setCurrentStatus] =
    useState<OrderStatus>(initialStatus);
  const [isPending, startTransition] = useTransition();

  const toggleStatus = () => {
    const newStatus =
      currentStatus === OrderStatus.pending
        ? OrderStatus.sent
        : OrderStatus.pending;

    startTransition(async () => {
      try {
        await updateOrderStatus(orderNumber, newStatus);
        setCurrentStatus(newStatus);
        console.log(`order ${orderNumber} status updated to ${newStatus}`);
      } catch (error) {
        console.error("Failed to update order status", error);
        alert("Failed to update order status.");
      }
    });
  };

  return (
    <Button
      variant="contained"
      color={currentStatus === OrderStatus.pending ? "warning" : "success"}
      onClick={toggleStatus}
      disabled={isPending} // Disable button while the update is pending
      sx={{ mt: 2 }}
    >
      {isPending
        ? "Updating..."
        : currentStatus === OrderStatus.pending
        ? "Mark as Sent"
        : "Mark as Pending"}
    </Button>
  );
}
