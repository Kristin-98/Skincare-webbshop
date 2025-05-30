"use client";

import { deleteProduct } from "@/app/product/[articleNumber]/[title]/product-actions";
import { RemoveCircleOutline } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState, useTransition } from "react";

export default function DeleteBtn({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    startTransition(async () => {
      await deleteProduct(productId);
      handleClose();
    });
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        color="primary"
        sx={{ minWidth: "auto" }}
        disabled={isPending}
      >
        <RemoveCircleOutline />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" disabled={isPending}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
