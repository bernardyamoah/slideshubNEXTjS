"use client";
import EmptyState from "@/lib/emptyState";
export default function Sample() {

  return (
    <>
      <main className="card_container">
        <h1 className="text-2xl font-bold mb-4 text-center">Empty state</h1>
        <EmptyState/>
      </main>
    </>
  );
}
