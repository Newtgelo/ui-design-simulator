import React from 'react';
import { Alert } from '../ui/Alert';
import { Badge } from '../ui/Badge';
import { SectionHeading } from '../ui/SectionHeading';

export const FeedbackSection: React.FC = () => {
  return (
    <section className="space-y-12">
      <SectionHeading level="h2" title="Feedback & Alerts" description="การแจ้งเตือนและป้ายสถานะ — Alert banners, badges, and interactive status indicators." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts Column */}
        <div className="lg:col-span-2 space-y-4">
          <SectionHeading level="h4" title="Alert Banner Variants" className="mb-2" />
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
            <SectionHeading level="h4" title="Badge Variants" className="mb-2" />
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
            <SectionHeading level="h4" title="Pill Shape Badges (ขอบกลมมนพิเศษ)" className="mb-2" />
            <div className="flex flex-wrap gap-2.5 p-6 bg-surface/50 border border-bordercolor rounded-2xl">
              <Badge variant="primary" className="rounded-full px-3 py-1 text-[11px]">Primary Pill</Badge>
              <Badge variant="success" className="rounded-full px-3 py-1 text-[11px]">Active</Badge>
              <Badge variant="danger" className="rounded-full px-3 py-1 text-[11px]">Inactive</Badge>
              <Badge variant="warning" className="rounded-full px-3 py-1 text-[11px]">Pending</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <SectionHeading level="h4" title="Interactive Badges" className="mb-2" />
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
