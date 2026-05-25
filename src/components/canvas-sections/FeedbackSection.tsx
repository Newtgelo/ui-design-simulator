import React from 'react';
import { Alert } from '../ui/Alert';
import { Badge } from '../ui/Badge';

export const FeedbackSection: React.FC = () => {
  return (
    <section className="space-y-12">
      <h3 className="text-xl font-bold border-b border-bordercolor pb-2 theme-transition flex items-center gap-2">
        <span className="w-2 h-6 bg-danger rounded-full"></span> Feedback & Alerts (การแจ้งเตือนและป้ายสถานะ)
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts Column */}
        <div className="lg:col-span-2 space-y-4">
          <label className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-2">Alert Banner Variants</label>
          <div className="grid grid-cols-1 gap-4">
            <Alert type="success" title="Payment Successful (ชำระเงินสำเร็จ)" message="Your receipt has been sent to your email. (ใบเสร็จถูกส่งไปยังอีเมลของคุณแล้ว)" />
            <Alert type="warning" title="Warning (คำเตือน)" message="Please check your connection. (กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต)" />
            <Alert type="danger" title="Error (เกิดข้อผิดพลาด)" message="Failed to save data. (ไม่สามารถบันทึกข้อมูลได้)" />
            <Alert type="info" title="New Update (อัปเดตใหม่)" message="Version 2.0 is available. (มีเวอร์ชัน 2.0 พร้อมให้ดาวน์โหลดแล้ว)" />
          </div>
        </div>

        {/* Badges Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-2">Badge Variants</label>
            <div className="flex flex-wrap gap-2.5 p-6 bg-surface/50 border border-bordercolor rounded-2xl">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-2">Pill Shape Badges (ขอบกลมมนพิเศษ)</label>
            <div className="flex flex-wrap gap-2.5 p-6 bg-surface/50 border border-bordercolor rounded-2xl">
              <Badge variant="primary" className="rounded-full px-3 py-1 text-[11px]">Primary Pill</Badge>
              <Badge variant="success" className="rounded-full px-3 py-1 text-[11px]">Active</Badge>
              <Badge variant="danger" className="rounded-full px-3 py-1 text-[11px]">Inactive</Badge>
              <Badge variant="warning" className="rounded-full px-3 py-1 text-[11px]">Pending</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-2">Interactive Badges</label>
            <div className="p-6 bg-surface/50 border border-bordercolor rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span>Task status:</span>
                <Badge variant="warning" className="cursor-pointer hover:bg-warning/20 transition-all">Review Needed</Badge>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Build status:</span>
                <Badge variant="success" className="cursor-pointer hover:bg-success/20 transition-all">Passed</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
