import DonationCategories from '@/components/donation/DonationCategories';
import MembershipSection from '@/components/membership/MembershipSection';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="space-y-12">
      <section id="donate" aria-labelledby="donate-heading">
        <div className="text-center mb-8">
          <h2 id="donate-heading" className="text-3xl font-bold tracking-tight text-primary">
            Support a Cause
          </h2>
          <p className="mt-2 text-lg text-foreground/80">
            Choose a category below to make a difference. Your contribution matters.
          </p>
        </div>
        <DonationCategories />
      </section>

      <Separator className="my-12" />

      <section id="membership" aria-labelledby="membership-heading">
         <div className="text-center mb-8">
          <h2 id="membership-heading" className="text-3xl font-bold tracking-tight text-primary">
            Become a SevaChampion
          </h2>
          <p className="mt-2 text-lg text-foreground/80">
            Join our SevaChampion program with a fixed contribution and receive a special certificate.
          </p>
        </div>
        <MembershipSection />
      </section>
    </div>
  );
}
