import React from 'react';
import { Alert } from '../ui/Alert';

export const FeedbackSection: React.FC = () => {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-bold border-b border-bordercolor pb-2 theme-transition flex items-center gap-2">
        <span className="w-2 h-6 bg-danger rounded-full"></span> Feedback & Alerts
      </h3>
      <div>
        <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Alert Variants</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Alert type="success" title="Payment Successful (ชำระเงินสำเร็จ)" message="Your receipt has been sent to your email. (ใบเสร็จถูกส่งไปยังอีเมลของคุณแล้ว)" />
          <Alert type="warning" title="Warning (คำเตือน)" message="Please check your connection. (กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต)" />
          <Alert type="danger" title="Error (เกิดข้อผิดพลาด)" message="Failed to save data. (ไม่สามารถบันทึกข้อมูลได้)" />
          <Alert type="info" title="New Update (อัปเดตใหม่)" message="Version 2.0 is available. (มีเวอร์ชัน 2.0 พร้อมให้ดาวน์โหลดแล้ว)" />
        </div>
      </div>
    </section>
  );
};
