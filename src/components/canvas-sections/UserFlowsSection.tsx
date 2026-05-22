"use client";

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { cn } from '@/lib/utils';
import { 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  DeviceMobile, 
  Monitor, 
  Spinner, 
  ShieldCheck, 
  User,
  Calendar,
  Clock,
  CalendarCheck,
  Check,
  ArrowLeft
} from '@phosphor-icons/react';

const avatarColors = [
  'bg-primary/10 text-primary border-primary/20',
  'bg-secondary/10 text-secondary border-secondary/20',
  'bg-success/10 text-success border-success/20',
  'bg-warning/10 text-warning border-warning/20'
];

export const UserFlowsSection: React.FC = () => {
  const { primaryColor, secondaryColor, borderRadius, shadowStyle, fontFamily, isDarkMode, showSnackbar } = useTheme();
  
  const [activeFlow, setActiveFlow] = useState<'checkout' | 'saas' | 'auth' | 'booking'>('checkout');
  const [step, setStep] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Checkout States
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'promptpay'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // SaaS States
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'enterprise'>('pro');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Auth & Onboarding States
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authTerms, setAuthTerms] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authRole, setAuthRole] = useState<'designer' | 'developer' | 'manager'>('designer');
  const [authAvatar, setAuthAvatar] = useState<number>(0);

  // Booking & Scheduling States
  const [bookingService, setBookingService] = useState<'consultation' | 'audit' | 'workshop'>('consultation');
  const [bookingDate, setBookingDate] = useState<string>('2026-05-25');
  const [bookingTime, setBookingTime] = useState<string>('14:00');
  const [bookingNotes, setBookingNotes] = useState<string>('');

  const cartItems = [
    { id: 1, name: 'Minimalist Mech Keyboard', desc: 'Brown switches, wireless', price: 129, qty: 1, imgColor: 'bg-primary/20' },
    { id: 2, name: 'Ergonomic Desk Mat', desc: 'Vegan leather, 900x400mm', price: 39, qty: 1, imgColor: 'bg-secondary/20' }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = couponApplied ? 15 : 0;
  const shipping = 10;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'WELCOME10') {
      setCouponApplied(true);
      setCouponError(false);
      showSnackbar('คูปอง "WELCOME10" สำเร็จแล้ว! ลด $15');
    } else {
      setCouponError(true);
      showSnackbar('รหัสคูปองไม่ถูกต้อง ลองใช้ "WELCOME10"');
    }
  };

  const handleNextStep = () => {
    if (activeFlow === 'checkout') {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        if (!shippingName || !shippingEmail || !shippingAddress) {
          showSnackbar('กรุณากรอกข้อมูลจัดส่งให้ครบถ้วน');
          return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setStep(3);
          showSnackbar('สั่งซื้อสินค้าสำเร็จแล้ว!');
        }, 1500);
      }
    } else if (activeFlow === 'saas') {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        if (!cardHolder || !cardNumber || !cardExpiry || !cardCvv) {
          showSnackbar('กรุณากรอกข้อมูลบัตรเครดิตให้ครบถ้วน');
          return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setStep(3);
          showSnackbar('อัปเกรดแผนสมาชิกสำเร็จแล้ว! ยินดีต้อนรับสู่ Pro');
        }, 1500);
      }
    } else if (activeFlow === 'auth') {
      if (step === 1) {
        if (!authEmail || !authPassword) {
          showSnackbar('กรุณากรอกอีเมลและรหัสผ่าน');
          return;
        }
        if (!authTerms) {
          showSnackbar('กรุณายอมรับเงื่อนไขการใช้บริการ');
          return;
        }
        setStep(2);
      } else if (step === 2) {
        if (!authName) {
          showSnackbar('กรุณากรอกชื่อแสดงผล');
          return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setStep(3);
          showSnackbar('ลงทะเบียนและตั้งค่าโปรไฟล์สำเร็จ!');
        }, 1500);
      }
    } else if (activeFlow === 'booking') {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        if (!bookingDate || !bookingTime) {
          showSnackbar('กรุณาเลือกวันและเวลาที่ต้องการนัดหมาย');
          return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setStep(3);
          showSnackbar('จองการนัดหมายของคุณสำเร็จแล้ว!');
        }, 1500);
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetFlow = () => {
    setStep(1);
    setCouponApplied(false);
    setCoupon('');
    setShippingName('');
    setShippingEmail('');
    setShippingAddress('');
    setCardHolder('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    // Auth resets
    setAuthEmail('');
    setAuthPassword('');
    setAuthTerms(false);
    setAuthName('');
    setAuthRole('designer');
    setAuthAvatar(0);
    // Booking resets
    setBookingService('consultation');
    setBookingDate('2026-05-25');
    setBookingTime('14:00');
    setBookingNotes('');
  };

  const renderCheckoutFlow = () => {
    const isMobileFrame = viewMode === 'mobile';

    const renderSteps = () => (
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-bordercolor text-[11px] sm:text-xs">
        <span className={cn("font-bold flex items-center gap-1.5", step === 1 ? "text-primary font-black" : "text-muted")}>
          <span className={cn("w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]", step === 1 ? "bg-primary text-white" : "bg-primary/10 text-primary")}>1</span>
          Shopping Cart
        </span>
        <ArrowRight size={12} className="text-muted shrink-0" />
        <span className={cn("font-bold flex items-center gap-1.5", step === 2 ? "text-primary font-black" : "text-muted")}>
          <span className={cn("w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]", step === 2 ? "bg-primary text-white" : step > 2 ? "bg-primary/10 text-primary" : "bg-bg border border-bordercolor text-muted")}>2</span>
          Shipping & Pay
        </span>
        <ArrowRight size={12} className="text-muted shrink-0" />
        <span className={cn("font-bold flex items-center gap-1.5", step === 3 ? "text-primary font-black" : "text-muted")}>
          <span className={cn("w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]", step === 3 ? "bg-primary text-white" : "bg-bg border border-bordercolor text-muted")}>3</span>
          Confirmation
        </span>
      </div>
    );

    return (
      <div className="w-full">
        {renderSteps()}
        {step === 1 && (
          <div className={cn("grid gap-6 animate-in fade-in duration-300", isMobileFrame ? "grid-cols-1" : "grid-cols-1 md:grid-cols-12")}>
            <div className={cn(isMobileFrame ? "" : "md:col-span-8", "space-y-4")}>
              <h4 className="font-bold text-base border-b border-bordercolor pb-2">Shopping Cart ({cartItems.length} items)</h4>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-surface/50 border border-bordercolor rounded-xl items-center">
                    <div className={cn("w-16 h-16 rounded-lg shrink-0 flex items-center justify-center font-bold text-sm", item.imgColor)}>
                      UI
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-sm truncate">{item.name}</h5>
                      <p className="text-xs text-muted truncate">{item.desc}</p>
                      <span className="text-xs font-semibold text-primary mt-1 block">${item.price}</span>
                    </div>
                    <div className="flex items-center gap-2 border border-bordercolor rounded-lg px-2 py-1">
                      <span className="text-xs font-bold font-mono">{item.qty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={cn(isMobileFrame ? "" : "md:col-span-4", "space-y-4")}>
              <div className="p-4 bg-surface border border-bordercolor rounded-2xl space-y-4">
                <h4 className="font-bold text-sm">Order Summary</h4>
                <div className="space-y-2 text-xs font-medium">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-${discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                  </div>
                  <div className="border-t border-bordercolor pt-2 mt-2 flex justify-between font-bold text-sm">
                    <span>Total</span>
                    <span className="text-primary">${total}</span>
                  </div>
                </div>
                
                <div className="pt-2 space-y-2">
                  <div className="flex gap-2">
                    <Input 
                      value={coupon} 
                      onChange={(e) => setCoupon(e.target.value)} 
                      placeholder="Coupon (e.g. WELCOME10)" 
                      className="h-9 text-xs" 
                      disabled={couponApplied}
                    />
                    <Button 
                      onClick={handleApplyCoupon} 
                      variant="outline" 
                      size="sm" 
                      disabled={couponApplied || !coupon}
                    >
                      Apply
                    </Button>
                  </div>
                  {couponError && <p className="text-[10px] text-danger font-semibold">รหัสไม่ถูกต้อง ลองใช้: WELCOME10</p>}
                  {couponApplied && <p className="text-[10px] text-success font-semibold">คูปองลดราคาพร้อมใช้งานแล้ว!</p>}
                </div>

                <Button onClick={handleNextStep} className="w-full h-10 mt-2">
                  Checkout Now <ArrowRight size={14} weight="bold" className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={cn("grid gap-6 animate-in fade-in duration-300", isMobileFrame ? "grid-cols-1" : "grid-cols-1 md:grid-cols-12")}>
            <div className={cn(isMobileFrame ? "" : "md:col-span-7", "space-y-4")}>
              <h4 className="font-bold text-base border-b border-bordercolor pb-2">Shipping Information</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Full Name</label>
                  <Input 
                    value={shippingName} 
                    onChange={(e) => setShippingName(e.target.value)} 
                    placeholder="John Doe" 
                    className="h-10 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Email Address</label>
                  <Input 
                    type="email"
                    value={shippingEmail} 
                    onChange={(e) => setShippingEmail(e.target.value)} 
                    placeholder="john@example.com" 
                    className="h-10 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Delivery Address</label>
                  <Input 
                    value={shippingAddress} 
                    onChange={(e) => setShippingAddress(e.target.value)} 
                    placeholder="123 Creative St, Designer Dist" 
                    className="h-10 text-xs"
                  />
                </div>
              </div>
            </div>
            <div className={cn(isMobileFrame ? "" : "md:col-span-5", "space-y-4")}>
              <div className="p-5 bg-surface border border-bordercolor rounded-2xl space-y-4">
                <h4 className="font-bold text-sm">Payment Method</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-xs font-semibold gap-2",
                      paymentMethod === 'card' ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-bordercolor hover:bg-bg text-muted"
                    )}
                  >
                    <CreditCard size={20} />
                    <span>Credit Card</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('promptpay')}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-xs font-semibold gap-2",
                      paymentMethod === 'promptpay' ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-bordercolor hover:bg-bg text-muted"
                    )}
                  >
                    <CheckCircle size={20} />
                    <span>PromptPay QR</span>
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] text-muted flex items-center gap-1"><ShieldCheck size={14} className="text-success" /> Secured Credit Card Transaction</div>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2 text-center p-3 bg-bg border border-bordercolor rounded-xl">
                    <div className="w-24 h-24 bg-white border border-bordercolor mx-auto rounded-lg flex items-center justify-center text-xs font-bold text-black">QR Code</div>
                    <span className="text-[10px] text-muted">Scan to pay ${total}</span>
                  </div>
                )}

                <div className="border-t border-bordercolor pt-3 mt-4 flex justify-between font-bold text-sm">
                  <span>Total Amount</span>
                  <span className="text-primary">${total}</span>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button onClick={handlePrevStep} variant="secondary" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleNextStep} className="flex-[2] h-10" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner className="animate-spin" size={16} /> : `Pay $${total}`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10 max-w-md mx-auto space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-success/15 border border-success/30 rounded-full flex items-center justify-center text-success mx-auto shadow-sm">
              <CheckCircle size={36} weight="fill" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Order Confirmed!</h3>
              <p className="text-xs text-muted mt-2">Thank you for your purchase. Your order #SC-940382 is being processed.</p>
            </div>
            
            <div className="bg-surface/50 border border-bordercolor rounded-2xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between text-muted"><span className="font-medium">Date</span><span>May 22, 2026</span></div>
              <div className="flex justify-between text-muted"><span className="font-medium">Ship To</span><span>{shippingName || 'Guest User'}</span></div>
              <div className="flex justify-between text-muted"><span className="font-medium">Total Paid</span><span className="font-bold text-primary">${total}</span></div>
            </div>

            <Button onClick={resetFlow} className="w-full">
              Back to Shop
            </Button>
          </div>
        )}
      </div>
    );
  };

  // SaaS Upgrade Flow UI
  const renderSaaSFlow = () => {
    const isMobileFrame = viewMode === 'mobile';

    const renderSteps = () => (
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-bordercolor text-[11px] sm:text-xs">
        <span className={cn("font-bold flex items-center gap-1.5", step === 1 ? "text-primary font-black" : "text-muted")}>
          <span className={cn("w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]", step === 1 ? "bg-primary text-white" : "bg-primary/10 text-primary")}>1</span>
          Pricing Plans
        </span>
        <ArrowRight size={12} className="text-muted shrink-0" />
        <span className={cn("font-bold flex items-center gap-1.5", step === 2 ? "text-primary font-black" : "text-muted")}>
          <span className={cn("w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]", step === 2 ? "bg-primary text-white" : step > 2 ? "bg-primary/10 text-primary" : "bg-bg border border-bordercolor text-muted")}>2</span>
          Payment Info
        </span>
        <ArrowRight size={12} className="text-muted shrink-0" />
        <span className={cn("font-bold flex items-center gap-1.5", step === 3 ? "text-primary font-black" : "text-muted")}>
          <span className={cn("w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]", step === 3 ? "bg-primary text-white" : "bg-bg border border-bordercolor text-muted")}>3</span>
          Success
        </span>
      </div>
    );

    return (
      <div className="w-full">
        {renderSteps()}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-center items-center gap-3">
              <span className={cn("text-xs font-bold", billingPeriod === 'monthly' ? "text-primary" : "text-muted")}>Monthly</span>
              <button 
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                className="w-11 h-6 bg-surface border border-bordercolor rounded-full relative transition-all duration-300"
              >
                <div 
                  className="w-4 h-4 rounded-full bg-primary absolute top-1 transition-all duration-300"
                  style={{ left: billingPeriod === 'monthly' ? '4px' : '22px' }}
                />
              </button>
              <span className={cn("text-xs font-bold flex items-center gap-1.5", billingPeriod === 'yearly' ? "text-primary" : "text-muted")}>
                Yearly
                <Badge variant="success" className="text-[9px] py-0.5 px-1 font-bold">Save 20%</Badge>
              </span>
            </div>

            <div className={cn("grid gap-6", isMobileFrame ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3")}>
              {[
                { id: 'starter', name: 'Starter', price: 19, desc: 'Ideal for designers & hobbyists', features: ['3 active projects', 'Basic presets library', 'Standard export'] },
                { id: 'pro', name: 'Professional', price: 49, desc: 'Best for agencies & small teams', features: ['Unlimited projects', 'Premium component scale', 'Figma Tokens sync', '24/7 Priority support'], popular: true },
                { id: 'enterprise', name: 'Enterprise', price: 99, desc: 'For large custom operations', features: ['Everything in Pro', 'Custom component generator', 'Advanced analytics dashboard', 'Dedicated success manager'] }
              ].map((plan) => {
                const actualPrice = billingPeriod === 'yearly' ? Math.round(plan.price * 0.8) : plan.price;
                const isSelected = selectedPlan === plan.id;
                
                return (
                  <div 
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id as any)}
                    className={cn(
                      "p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative",
                      isSelected 
                        ? "border-primary bg-primary/[0.02] shadow-lg scale-[1.02]" 
                        : "border-bordercolor hover:border-muted hover:bg-surface bg-surface/50"
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 right-6 bg-secondary text-white text-[9px] font-bold py-1 px-2.5 rounded-full shadow-sm">
                        MOST POPULAR
                      </div>
                    )}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-base">{plan.name}</h4>
                        <p className="text-xs text-muted mt-1 leading-snug">{plan.desc}</p>
                      </div>
                      <div className="flex items-baseline gap-1 pt-2">
                        <span className="text-3xl font-black">{`$${actualPrice}`}</span>
                        <span className="text-xs text-muted font-bold">/mo</span>
                      </div>
                      <div className="border-t border-bordercolor/50 pt-4 space-y-2">
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-muted">
                            <CheckCircle size={14} className="text-primary shrink-0" weight="fill" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-6" 
                      variant={isSelected ? 'primary' : 'secondary'}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlan(plan.id as any);
                        handleNextStep();
                      }}
                    >
                      Choose Plan
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={cn("grid gap-8 items-center animate-in fade-in duration-300", isMobileFrame ? "grid-cols-1" : "grid-cols-1 md:grid-cols-12")}>
            <div className={cn(isMobileFrame ? "" : "md:col-span-5", "flex flex-col items-center")}>
              {/* Animated Credit Card Representation */}
              <div 
                className="w-full max-w-[320px] aspect-[1.586/1] rounded-2xl p-5 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  borderRadius: `${borderRadius * 1.5}px`
                }}
              >
                <div className="absolute inset-0 bg-white/[0.05] pointer-events-none" />
                <div className="flex justify-between items-start">
                  <div className="text-xs font-bold tracking-widest uppercase">SysCraft Pay</div>
                  <div className="w-10 h-7 bg-white/20 rounded-md flex items-center justify-center text-[10px] font-bold">Chip</div>
                </div>
                <div className="text-lg font-mono tracking-widest font-semibold py-2">
                  {cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[8px] opacity-60 uppercase">Card Holder</div>
                    <div className="text-xs font-bold tracking-wide truncate max-w-[150px] uppercase">
                      {cardHolder || 'Your Name'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[8px] opacity-60 uppercase text-right">Expires</div>
                    <div className="text-xs font-bold font-mono text-right">
                      {cardExpiry || 'MM/YY'}
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-muted mt-3 font-semibold uppercase tracking-wider">Visual Preview of Active Design System variables</span>
            </div>

            <div className={cn(isMobileFrame ? "" : "md:col-span-7", "space-y-4")}>
              <h4 className="font-bold text-base border-b border-bordercolor pb-2">Credit Card Details</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Cardholder Name</label>
                  <Input 
                    value={cardHolder} 
                    onChange={(e) => setCardHolder(e.target.value)} 
                    placeholder="JOHN DOE" 
                    className="h-10 text-xs uppercase"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Card Number</label>
                  <Input 
                    value={cardNumber} 
                    onChange={(e) => {
                      // Quick credit card number formatting
                      const value = e.target.value.replace(/\D/g, '').substring(0, 16);
                      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                      setCardNumber(formatted);
                    }} 
                    placeholder="4000 1234 5678 9010" 
                    className="h-10 text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Expiration Date</label>
                    <Input 
                      value={cardExpiry} 
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').substring(0, 4);
                        const formatted = value.length >= 2 ? `${value.substring(0, 2)}/${value.substring(2)}` : value;
                        setCardExpiry(formatted);
                      }} 
                      placeholder="MM/YY" 
                      className="h-10 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">CVV / Security Code</label>
                    <Input 
                      value={cardCvv} 
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 3))} 
                      placeholder="123" 
                      className="h-10 text-xs font-mono"
                      type="password"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handlePrevStep} variant="secondary" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleNextStep} className="flex-[2] h-10" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner className="animate-spin" size={16} /> : `Confirm & Pay`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10 max-w-md mx-auto space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-success/15 border border-success/30 rounded-full flex items-center justify-center text-success mx-auto shadow-sm">
              <CheckCircle size={36} weight="fill" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Successfully Upgraded!</h3>
              <p className="text-xs text-muted mt-2">Welcome to SysCraft Pro. You now have unlimited access to all features.</p>
            </div>

            <div className="bg-surface/50 border border-bordercolor rounded-2xl p-6 text-left flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0 border border-primary/20">
                <User size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-sm truncate">{cardHolder || 'Registered Member'}</h5>
                <p className="text-[10px] text-muted font-bold uppercase tracking-wider mt-0.5">Plan: Professional ({billingPeriod})</p>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">ACTIVE</Badge>
            </div>

            <Button onClick={resetFlow} className="w-full">
              Return to Comparison
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Auth & Onboarding Flow UI
  const renderAuthFlow = () => {
    const isMobileFrame = viewMode === 'mobile';

    const renderSteps = () => (
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-bordercolor text-[11px] sm:text-xs">
        <span className={cn("font-bold flex items-center gap-1.5", step === 1 ? "text-primary font-black" : "text-muted")}>
          <span className={cn("w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]", step === 1 ? "bg-primary text-white" : "bg-primary/10 text-primary")}>1</span>
          Register
        </span>
        <ArrowRight size={12} className="text-muted shrink-0" />
        <span className={cn("font-bold flex items-center gap-1.5", step === 2 ? "text-primary font-black" : "text-muted")}>
          <span className={cn("w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]", step === 2 ? "bg-primary text-white" : step > 2 ? "bg-primary/10 text-primary" : "bg-bg border border-bordercolor text-muted")}>2</span>
          Profile Setup
        </span>
        <ArrowRight size={12} className="text-muted shrink-0" />
        <span className={cn("font-bold flex items-center gap-1.5", step === 3 ? "text-primary font-black" : "text-muted")}>
          <span className={cn("w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]", step === 3 ? "bg-primary text-white" : "bg-bg border border-bordercolor text-muted")}>3</span>
          Welcome
        </span>
      </div>
    );

    return (
      <div className="w-full">
        {renderSteps()}
        {step === 1 && (
          <div className={cn("grid gap-8 items-center animate-in fade-in duration-300", isMobileFrame ? "grid-cols-1" : "grid-cols-1 md:grid-cols-12")}>
            <div className={cn(isMobileFrame ? "" : "md:col-span-6", "space-y-4")}>
              <div className="space-y-2">
                <h4 className="font-bold text-base">Create Account</h4>
                <p className="text-xs text-muted">Join SysCraft to start simulating and exporting your designs.</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Email Address</label>
                  <Input 
                    type="email"
                    value={authEmail} 
                    onChange={(e) => setAuthEmail(e.target.value)} 
                    placeholder="name@example.com" 
                    className="h-10 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Password</label>
                  <Input 
                    type="password"
                    value={authPassword} 
                    onChange={(e) => setAuthPassword(e.target.value)} 
                    placeholder="••••••••" 
                    className="h-10 text-xs"
                  />
                  {authPassword && (
                    <div className="mt-1.5 flex gap-1 items-center">
                      <div className="flex-1 h-1 rounded bg-bordercolor overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-300", 
                            authPassword.length < 6 ? "w-1/3 bg-danger" : authPassword.length < 10 ? "w-2/3 bg-warning" : "w-full bg-success"
                          )} 
                        />
                      </div>
                      <span className="text-[9px] font-bold text-muted shrink-0">
                        {authPassword.length < 6 ? "Weak" : authPassword.length < 10 ? "Medium" : "Strong"}
                      </span>
                    </div>
                  )}
                </div>
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input 
                    type="checkbox" 
                    checked={authTerms} 
                    onChange={(e) => setAuthTerms(e.target.checked)} 
                    className="rounded border-bordercolor text-primary focus:ring-primary h-4 w-4 bg-surface"
                  />
                  <span className="text-xs text-muted">I agree to the <span className="text-primary hover:underline">Terms</span> and <span className="text-primary hover:underline">Privacy Policy</span></span>
                </label>
              </div>
              
              <Button onClick={handleNextStep} className="w-full h-10 mt-2">
                Next Step <ArrowRight size={14} weight="bold" className="ml-2" />
              </Button>
            </div>
            
            <div className={cn(isMobileFrame ? "hidden" : "md:col-span-6", "bg-primary/5 rounded-2xl border border-primary/10 border-dashed p-6 text-center space-y-4")}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
                <User size={24} />
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-sm">Secure Authentication</h5>
                <p className="text-xs text-muted max-w-[200px] mx-auto leading-normal">Your password is encrypted using high-grade hashing protocols.</p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={cn("grid gap-8 items-center animate-in fade-in duration-300", isMobileFrame ? "grid-cols-1" : "grid-cols-1 md:grid-cols-12")}>
            <div className={cn(isMobileFrame ? "" : "md:col-span-7", "space-y-5")}>
              <div>
                <h4 className="font-bold text-base">Setup Profile</h4>
                <p className="text-xs text-muted">Customize your public presence on the platform.</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">Select Avatar</label>
                  <div className="flex gap-3">
                    {[0, 1, 2, 3].map((idx) => (
                      <button
                        key={idx}
                        onClick={() => setAuthAvatar(idx)}
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all relative",
                          avatarColors[idx],
                          authAvatar === idx ? "scale-110 border-tx ring-4 ring-primary/20 shadow-md" : "opacity-60 hover:opacity-100 border-transparent"
                        )}
                      >
                        U{idx + 1}
                        {authAvatar === idx && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary text-[8px] text-white flex items-center justify-center font-bold border border-surface">✓</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Display Name</label>
                  <Input 
                    value={authName} 
                    onChange={(e) => setAuthName(e.target.value)} 
                    placeholder="Creative User" 
                    className="h-10 text-xs"
                  />
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">Your Role</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'designer', name: 'Designer' },
                      { id: 'developer', name: 'Developer' },
                      { id: 'manager', name: 'Manager' }
                    ].map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setAuthRole(role.id as any)}
                        className={cn(
                          "py-2 px-3 rounded-xl border text-[11px] font-bold transition-all",
                          authRole === role.id 
                            ? "border-primary bg-primary/5 text-primary shadow-sm" 
                            : "border-bordercolor hover:bg-bg text-muted"
                        )}
                      >
                        {role.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button onClick={handlePrevStep} variant="secondary" className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNextStep} className="flex-[2] h-10" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner className="animate-spin" size={16} /> : "Complete Setup"}
                </Button>
              </div>
            </div>
            
            <div className={cn(isMobileFrame ? "" : "md:col-span-5", "flex flex-col items-center justify-center p-6 bg-surface border border-bordercolor rounded-2xl text-center space-y-4")}>
              <div 
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl border-4 relative",
                  avatarColors[authAvatar]
                )}
                style={{
                  borderRadius: `${borderRadius * 2.5}px`
                }}
              >
                U{authAvatar + 1}
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-sm truncate max-w-[150px]">{authName || 'Creative User'}</h5>
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary border-primary/20">{authRole}</Badge>
              </div>
              <p className="text-[10px] text-muted leading-relaxed">Live visual representation of the active profile mockup styling.</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8 max-w-md mx-auto space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-success/15 border border-success/30 rounded-full flex items-center justify-center text-success mx-auto shadow-sm">
              <CheckCircle size={36} weight="fill" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Welcome Aboard!</h3>
              <p className="text-xs text-muted mt-2">Your profile has been created. Start simulating your theme changes.</p>
            </div>
            
            <div className="bg-surface/50 border border-bordercolor rounded-2xl p-6 text-left flex items-center gap-4">
              <div className={cn("w-14 h-14 rounded-full flex items-center justify-center font-black text-lg border-2 shrink-0 shadow-sm", avatarColors[authAvatar])}
                   style={{ borderRadius: `${borderRadius * 1.5}px` }}>
                U{authAvatar + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-sm truncate">{authName || 'Creative User'}</h5>
                <p className="text-[10px] text-muted font-bold uppercase tracking-wider mt-0.5">Role: {authRole}</p>
                <p className="text-[10px] text-muted truncate">{authEmail || 'name@example.com'}</p>
              </div>
              <Badge variant="success" className="text-[10px]">VERIFIED</Badge>
            </div>
            
            <Button onClick={resetFlow} className="w-full">
              Restart Onboarding
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Booking & Scheduling Flow UI
  const renderBookingFlow = () => {
    const isMobileFrame = viewMode === 'mobile';

    const services = [
      { id: 'consultation', name: 'UX/UI Consultation', price: 150, duration: '1 Hour', desc: '1-on-1 expert review of your application designs and product flows.', icon: Calendar },
      { id: 'audit', name: 'Design System Audit', price: 350, duration: '2 Hours', desc: 'Detailed analysis of your tokens, component states, and accessibility compliance.', icon: ShieldCheck },
      { id: 'workshop', name: 'Tokens Masterclass', price: 250, duration: '3 Hours', desc: 'Interactive workshop on structuring cross-platform design token frameworks.', icon: Clock }
    ];

    const dates = [
      { day: 'Mon', date: 'May 25', value: '2026-05-25', status: 'available' },
      { day: 'Tue', date: 'May 26', value: '2026-05-26', status: 'booked' },
      { day: 'Wed', date: 'May 27', value: '2026-05-27', status: 'available' },
      { day: 'Thu', date: 'May 28', value: '2026-05-28', status: 'available' },
      { day: 'Fri', date: 'May 29', value: '2026-05-29', status: 'booked' },
      { day: 'Sat', date: 'May 30', value: '2026-05-30', status: 'unavailable' },
      { day: 'Sun', date: 'May 31', value: '2026-05-31', status: 'unavailable' },
      { day: 'Mon', date: 'Jun 01', value: '2026-06-01', status: 'available' },
      { day: 'Tue', date: 'Jun 02', value: '2026-06-02', status: 'available' },
      { day: 'Wed', date: 'Jun 03', value: '2026-06-03', status: 'booked' },
      { day: 'Thu', date: 'Jun 04', value: '2026-06-04', status: 'available' },
      { day: 'Fri', date: 'Jun 05', value: '2026-06-05', status: 'available' }
    ];

    const timeSlots = [
      { time: '09:00 AM', value: '09:00', available: true },
      { time: '10:30 AM', value: '10:30', available: false },
      { time: '01:00 PM', value: '13:00', available: true },
      { time: '02:30 PM', value: '14:30', available: true },
      { time: '04:00 PM', value: '16:00', available: true }
    ];

    const selectedServiceDetails = services.find(s => s.id === bookingService) || services[0];

    const renderSteps = () => (
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-bordercolor text-[11px] sm:text-xs">
        <span className={cn("font-bold flex items-center gap-1.5", step === 1 ? "text-primary font-black" : "text-muted")}>
          <span className={cn("w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]", step === 1 ? "bg-primary text-white" : "bg-primary/10 text-primary")}>1</span>
          Select Service
        </span>
        <ArrowRight size={12} className="text-muted shrink-0" />
        <span className={cn("font-bold flex items-center gap-1.5", step === 2 ? "text-primary font-black" : "text-muted")}>
          <span className={cn("w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]", step === 2 ? "bg-primary text-white" : step > 2 ? "bg-primary/10 text-primary" : "bg-bg border border-bordercolor text-muted")}>2</span>
          Date & Time
        </span>
        <ArrowRight size={12} className="text-muted shrink-0" />
        <span className={cn("font-bold flex items-center gap-1.5", step === 3 ? "text-primary font-black" : "text-muted")}>
          <span className={cn("w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]", step === 3 ? "bg-primary text-white" : "bg-bg border border-bordercolor text-muted")}>3</span>
          Confirmation
        </span>
      </div>
    );

    return (
      <div className="w-full">
        {renderSteps()}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center md:text-left space-y-1">
              <h4 className="font-bold text-base">Choose a Consultation Service</h4>
              <p className="text-xs text-muted">Select the type of design system session you would like to schedule.</p>
            </div>
            
            <div className={cn("grid gap-4", isMobileFrame ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3")}>
              {services.map((srv) => {
                const SrvIcon = srv.icon;
                const isSelected = bookingService === srv.id;
                return (
                  <div 
                    key={srv.id}
                    onClick={() => setBookingService(srv.id as any)}
                    className={cn(
                      "p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative text-left",
                      isSelected 
                        ? "border-primary bg-primary/[0.03] shadow-md scale-[1.01]" 
                        : "border-bordercolor hover:border-muted hover:bg-surface bg-surface/30"
                    )}
                    style={{
                      borderRadius: `${borderRadius * 1.2}px`
                    }}
                  >
                    <div className="space-y-3">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border", isSelected ? "bg-primary/10 border-primary/30 text-primary" : "bg-surface border-bordercolor text-muted")}>
                        <SrvIcon size={20} />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm">{srv.name}</h5>
                        <p className="text-[11px] text-muted mt-1 leading-normal">{srv.desc}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-3 border-t border-bordercolor/50 flex justify-between items-baseline">
                      <span className="text-[10px] text-muted font-bold">{srv.duration}</span>
                      <span className="text-base font-black text-primary">${srv.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-end pt-2">
              <Button onClick={handleNextStep} className="px-6 h-10">
                Continue to Scheduler <ArrowRight size={14} weight="bold" className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <div className="space-y-1">
              <h4 className="font-bold text-base">Select Date & Time</h4>
              <p className="text-xs text-muted">Pick an available day and time slot that fits your schedule.</p>
            </div>
            
            <div className={cn("grid gap-6", isMobileFrame ? "grid-cols-1" : "grid-cols-1 md:grid-cols-12")}>
              {/* Date selection grid */}
              <div className={cn(isMobileFrame ? "" : "md:col-span-7", "space-y-3")}>
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider block">Available Dates</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {dates.map((d) => {
                    const isSelected = bookingDate === d.value;
                    const isBooked = d.status === 'booked';
                    const isUnavailable = d.status === 'unavailable';
                    
                    return (
                      <button
                        key={d.value}
                        disabled={isBooked || isUnavailable}
                        onClick={() => setBookingDate(d.value)}
                        className={cn(
                          "p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all relative text-center",
                          isSelected 
                            ? "border-primary bg-primary/5 text-primary font-bold shadow-sm" 
                            : isBooked
                              ? "border-bordercolor bg-surface/20 text-muted opacity-40 cursor-not-allowed line-through"
                              : isUnavailable
                                ? "border-bordercolor bg-surface/10 text-muted/30 cursor-not-allowed"
                                : "border-bordercolor hover:bg-surface text-muted font-medium"
                        )}
                        style={{
                          borderRadius: `${borderRadius}px`
                        }}
                      >
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">{d.day}</span>
                        <span className="text-xs font-bold mt-0.5">{d.date.split(' ')[1]}</span>
                        <span className="text-[8px] opacity-75 mt-0.5">{d.date.split(' ')[0]}</span>
                        {isBooked && (
                          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-danger" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-4 text-[10px] text-muted font-semibold pt-1">
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded border border-bordercolor bg-bg" /> Available</div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded border border-primary/20 bg-primary/5" /> Selected</div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-danger" /> Booked</div>
                </div>
              </div>
              
              {/* Time selection and notes */}
              <div className={cn(isMobileFrame ? "" : "md:col-span-5", "space-y-4")}>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block">Available Timeslots</label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((t) => {
                      const isSelected = bookingTime === t.value;
                      const isAvail = t.available;
                      
                      return (
                        <button
                          key={t.value}
                          disabled={!isAvail}
                          onClick={() => setBookingTime(t.value)}
                          className={cn(
                            "py-2 px-3 rounded-lg border text-xs font-bold transition-all text-center",
                            isSelected 
                              ? "border-primary bg-primary/5 text-primary shadow-sm" 
                              : isAvail 
                                ? "border-bordercolor hover:bg-bg text-muted" 
                                : "border-bordercolor/40 text-muted/30 bg-surface/10 cursor-not-allowed line-through"
                          )}
                          style={{
                            borderRadius: `${borderRadius}px`
                          }}
                        >
                          {t.time}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block">Session Notes (Optional)</label>
                  <textarea
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="Describe what you want to focus on..."
                    className="w-full h-20 px-3 py-2 text-xs bg-surface border border-bordercolor rounded-lg focus:outline-none focus:border-primary/50 text-tx placeholder-muted"
                    style={{
                      borderRadius: `${borderRadius}px`
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4 border-t border-bordercolor/50">
              <Button onClick={handlePrevStep} variant="secondary" className="flex-1">
                Back
              </Button>
              <Button onClick={handleNextStep} className="flex-[2] h-10" disabled={isSubmitting}>
                {isSubmitting ? <Spinner className="animate-spin" size={16} /> : "Confirm Appointment"}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-6 max-w-md mx-auto space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-success/15 border border-success/30 rounded-full flex items-center justify-center text-success mx-auto shadow-sm">
              <CalendarCheck size={36} weight="fill" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Booking Confirmed!</h3>
              <p className="text-xs text-muted mt-2">Your session has been scheduled successfully. A calendar invite was sent.</p>
            </div>
            
            {/* Ticket Stub Design with dashed border */}
            <div 
              className="bg-surface border border-dashed border-bordercolor rounded-2xl relative overflow-hidden text-left"
              style={{
                borderRadius: `${borderRadius * 1.5}px`
              }}
            >
              {/* Ticket Top */}
              <div className="p-5 border-b border-dashed border-bordercolor/80 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black text-primary uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 border border-primary/20">Design Token System</span>
                    <h4 className="font-bold text-base mt-2">{selectedServiceDetails.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-muted block">Fee Paid</span>
                    <span className="font-black text-lg text-primary">${selectedServiceDetails.price}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">Date</span>
                    <span className="font-semibold text-tx">{bookingDate}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">Time</span>
                    <span className="font-semibold text-tx">{bookingTime} ({selectedServiceDetails.duration})</span>
                  </div>
                </div>
              </div>

              {/* Half-circles on left and right borders to represent a ticket tear */}
              <div className="absolute left-0 top-[116px] -translate-x-1/2 w-4 h-4 rounded-full bg-bg border-r border-bordercolor" />
              <div className="absolute right-0 top-[116px] translate-x-1/2 w-4 h-4 rounded-full bg-bg border-l border-bordercolor" />

              {/* Ticket Bottom */}
              <div className="p-5 bg-surface/50 space-y-3">
                {bookingNotes && (
                  <div>
                    <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">Attendee Notes</span>
                    <p className="text-xs text-muted italic mt-0.5 leading-normal">"{bookingNotes}"</p>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-success" />
                    <span className="text-[9px] font-black text-success uppercase tracking-wider">Secured Appointment</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted">ID: DS-{(Math.random() * 100000).toFixed(0)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(`${selectedServiceDetails.name} - วันที่ ${bookingDate} เวลา ${bookingTime}`);
                  showSnackbar(`คัดลอกรายละเอียดการจองแล้ว`);
                }} 
                variant="outline" 
                className="flex-1"
              >
                Copy Appointment Info
              </Button>
              <Button 
                onClick={() => {
                  showSnackbar('เพิ่มการนัดหมายลงในปฏิทินสำเร็จแล้ว!');
                }} 
                className="flex-1"
              >
                Add to Calendar
              </Button>
            </div>
            
            <Button onClick={resetFlow} variant="secondary" className="w-full">
              Schedule Another Session
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Interactive User Flows</h2>
          <p className="text-muted mt-2">Simulate real multi-step user pipelines and screen transitions using your Design System.</p>
        </div>
        <div className="flex gap-2 bg-surface p-1 rounded-xl border border-bordercolor overflow-x-auto scrollbar-none flex-nowrap max-w-full shrink-0">
          <button 
            onClick={() => {
              setActiveFlow('checkout');
              resetFlow();
            }}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
              activeFlow === 'checkout' ? "bg-primary text-white shadow-sm" : "text-muted hover:text-tx"
            )}
          >
            Checkout Flow
          </button>
          <button 
            onClick={() => {
              setActiveFlow('saas');
              resetFlow();
            }}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
              activeFlow === 'saas' ? "bg-primary text-white shadow-sm" : "text-muted hover:text-tx"
            )}
          >
            SaaS Upgrade
          </button>
          <button 
            onClick={() => {
              setActiveFlow('auth');
              resetFlow();
            }}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
              activeFlow === 'auth' ? "bg-primary text-white shadow-sm" : "text-muted hover:text-tx"
            )}
          >
            Onboarding Flow
          </button>
          <button 
            onClick={() => {
              setActiveFlow('booking');
              resetFlow();
            }}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
              activeFlow === 'booking' ? "bg-primary text-white shadow-sm" : "text-muted hover:text-tx"
            )}
          >
            Booking Flow
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Stepper and simulator frame */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between gap-4 bg-surface px-4 sm:px-6 py-4 rounded-2xl border border-bordercolor shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                {activeFlow === 'checkout' && "E-Commerce Checkout Simulation"}
                {activeFlow === 'saas' && "SaaS Upgrade Simulation"}
                {activeFlow === 'auth' && "User Onboarding Simulation"}
                {activeFlow === 'booking' && "Booking & Scheduling Simulation"}
              </span>
            </div>

            {/* Desktop / Mobile view toggle */}
            <div className="flex border border-bordercolor rounded-lg p-0.5 shrink-0 bg-bg">
              <button 
                onClick={() => setViewMode('desktop')}
                className={cn(
                  "p-1.5 rounded transition-all",
                  viewMode === 'desktop' ? "bg-surface text-primary shadow-sm" : "text-muted hover:text-tx"
                )}
                title="Desktop View"
              >
                <Monitor size={16} />
              </button>
              <button 
                onClick={() => setViewMode('mobile')}
                className={cn(
                  "p-1.5 rounded transition-all",
                  viewMode === 'mobile' ? "bg-surface text-primary shadow-sm" : "text-muted hover:text-tx"
                )}
                title="Mobile View"
              >
                <DeviceMobile size={16} />
              </button>
            </div>
          </div>

          {/* Interactive Screen Preview Container */}
          <div className="flex justify-center items-center w-full min-h-[500px]">
            {viewMode === 'desktop' ? (
              <Card className="w-full min-h-[500px] p-8 border border-bordercolor shadow-xl flex flex-col justify-between relative overflow-hidden bg-bg">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                <div className="flex-1 py-4">
                  {activeFlow === 'checkout' ? renderCheckoutFlow() : activeFlow === 'saas' ? renderSaaSFlow() : activeFlow === 'auth' ? renderAuthFlow() : renderBookingFlow()}
                </div>
              </Card>
            ) : (
              <div 
                className="w-full max-w-[375px] min-h-[640px] border-[10px] border-surface rounded-[40px] shadow-2xl relative overflow-hidden bg-bg flex flex-col"
                style={{
                  borderColor: isDarkMode ? '#1e1e24' : '#eceef0'
                }}
              >
                {/* Mobile Top Notch Area */}
                <div className="h-6 w-full flex justify-center items-center relative select-none">
                  <div className="w-32 h-4 bg-surface rounded-full absolute -top-1 border-x border-b border-bordercolor" />
                </div>
                <div className="flex-1 p-5 overflow-y-auto pb-8 select-text">
                  {activeFlow === 'checkout' ? renderCheckoutFlow() : activeFlow === 'saas' ? renderSaaSFlow() : activeFlow === 'auth' ? renderAuthFlow() : renderBookingFlow()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
