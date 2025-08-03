"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, MapPin } from "lucide-react";

interface InfoContent {
  title: string;
  content: string;
  location: string;
}

export default function InfoDialog() {
  const [infoContent, setInfoContent] = useState<InfoContent>({
    title: "Centre for Sight Eye Hospital",
    content: `Centre for Sight Eye Hospital in Varanasi houses state-of-the-art facilities with highly knowledgeable and experienced eye specialists. We offer comprehensive eye care and work with a passion for providing the best possible treatment to every patient at all times. Our ophthalmologists will ensure every patient is given the utmost attention and highest quality eye care, from routine examination to any eye surgery. Moreover, the reputation of Centre for Sight Eye hospital for its top-notch facilities, robust infrastructure, experienced surgeons, and record of outstanding performance makes the chain a highly respected entity in India. The specialities of Centre For Sight, Varanasi include blade-free Cataract treatment, LASIK Laser Eye Surgeries, Diabetic Retinopathy, Glaucoma treatment, Comprehensive Eye Care, and Ocular Surface & Dry Eyes.

Specialties at Centre for Sight eye hospital in Varanasi:

LASIK Laser Eye Surgery:
The ability to see depends on the way that your eyes refract light. A refractive error occurs when it does not bend perfectly, preventing the eye from focusing light correctly. Our eye hospital in Varanasi provides LASIK eye surgery to clear vision at any age. Also, we offer Small Incision Lenticule Extraction (SMILE) laser eye surgery, which is an FDA-approved procedure and treats mild astigmatism, with cylindrical power up to - 0.5 only. Our LASIK specialists in Varanasi are highly skilful and work with state-of-the-art technology to help you achieve freedom from glasses and contact lenses.

Cataract Eye Surgery:
Cataract, also known as Motiyabind, is a clouding of the eye leading to blurred vision and other medical conditions affecting the eyes. Surgical intervention is necessary, and the best cataract treatment requires the combination of the expertise of highly experienced doctors and cutting- edge technology. Our eye hospital in Varanasi is well equipped to perform robotic femtosecond laser cataract surgery, resulting in quicker recovery and better visual outcomes.

Glaucoma Treatment:
Glaucoma is one of the most severe eyesight threatening conditions. Any vision loss that had occurred before the diagnosis of glaucoma — cannot be reversed. However, medical or surgical treatment can prevent further vision loss. The experienced ophthalmologists at our Varanasi Centre specialize in treating glaucoma by using eye drops, or surgery, whereas other treatment options include the insertion of a glaucoma filtration device, new types of valves, and vitreoretinal techniques.

Diabetic Retinopathy:
Diabetic retinopathy is a diabetes complication that affects the eyes, caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina). At Centre for Sight Eye hospital in Varanasi, we have the best retina specialists who treat patients with utmost care and precision for diabetic retinal disorders. Also, our experienced diabetic retinopathy specialists conduct a comprehensive eye examination to detect and access the severity of diabetic retinopathy through extensive tests such as Biometry/ Intraocular Lens (IOL) workup, specular microscopy, OCT test, B Scan/ Ultrasound, and pentacam test. services.

Pediatric Ophthalmology:
Keeping a close check on your children's eye health in their growing years is quintessential. They may experience a variety of eye problems, which are relatively distinct from adult eye diseases. So, with our skilled team of pediatric eye specialists at Varanasi, we ensure a smooth treatment experience for every child who visits the centre. We offer treatment for strabismus and many other eye disorders that are commonly seen in children.

Computer Vision Syndrome:
Do you suffer from eye strain due to uninterrupted hours working on a computer/laptop? You might be suffering from computer vision syndrome (CVS). Our eye specialists offer end-to-end treatment for this eye disorder. Our eye hospital in Varanasi provides comprehensive eye care treatment, right from consultation to chalking out strategies to eliminate computer vision syndrome.`,
    location: "Varanasi, Uttar Pradesh, India"
  });

  useEffect(() => {
    const saved = localStorage.getItem("infoContent");
    if (saved) {
      setInfoContent(JSON.parse(saved));
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1 h-auto">
          <Info className="h-4 w-4 text-accent" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">{infoContent.title}</DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{infoContent.location}</span>
          </div>
        </DialogHeader>
        <div className="mt-4">
          <div className="prose prose-sm max-w-none">
            {infoContent.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-sm leading-relaxed">
                {paragraph.includes(':') && !paragraph.startsWith('Centre for Sight') ? (
                  <>
                    <strong className="text-primary">{paragraph.split(':')[0]}:</strong>
                    {paragraph.split(':').slice(1).join(':')}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}