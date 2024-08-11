"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const mac = "1a-2a-3a-4a-5a-6a";

  useEffect(() => {
    // เปลี่ยนเส้นทางไปยัง "/Auth_thd&mac=aa-bb-cc-aa-bb-cc"
    router.push(`/Auth_thd?mac=${mac}`);
  }, [router]);

  return null; // ไม่แสดงผลอะไรเพราะเราจะเปลี่ยนเส้นทางแล้ว
}
