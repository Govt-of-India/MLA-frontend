import { getLocale, getTranslations } from "next-intl/server"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Award, Calendar, Users, Target, Heart, Briefcase, GraduationCap } from "lucide-react"

export default async function AboutPage() {
  const [locale, t, profileT] = await Promise.all([
    getLocale(),
    getTranslations("pages"),
    getTranslations("profile"),
  ])

  const careerMilestones = [
    {
      year: "2019",
      title: locale === "hi" ? "विधायक निर्वाचित" : "Elected as MLA",
      description: locale === "hi" 
        ? "सिधौली विधानसभा क्षेत्र से विधायक के रूप में निर्वाचित"
        : "Elected as Member of Legislative Assembly from Sidhauli constituency",
    },
    {
      year: "2017",
      title: locale === "hi" ? "पार्टी नेतृत्व" : "Party Leadership",
      description: locale === "hi"
        ? "जिला स्तर पर पार्टी संगठन में महत्वपूर्ण भूमिका"
        : "Key role in party organization at district level",
    },
    {
      year: "2014",
      title: locale === "hi" ? "सामाजिक कार्य" : "Social Work",
      description: locale === "hi"
        ? "समाज सेवा और जन कल्याण कार्यों की शुरुआत"
        : "Began community service and public welfare initiatives",
    },
  ]

  const achievements = [
    {
      icon: Users,
      title: locale === "hi" ? "जन सेवा" : "Public Service",
      value: "5+",
      label: locale === "hi" ? "वर्षों का अनुभव" : "Years of Experience",
    },
    {
      icon: Target,
      title: locale === "hi" ? "विकास परियोजनाएं" : "Development Projects",
      value: "50+",
      label: locale === "hi" ? "पूर्ण परियोजनाएं" : "Projects Completed",
    },
    {
      icon: Heart,
      title: locale === "hi" ? "स्वास्थ्य शिविर" : "Health Camps",
      value: "100+",
      label: locale === "hi" ? "आयोजित शिविर" : "Camps Organized",
    },
    {
      icon: GraduationCap,
      title: locale === "hi" ? "छात्रवृत्ति" : "Scholarships",
      value: "500+",
      label: locale === "hi" ? "लाभार्थी छात्र" : "Students Benefited",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FF7A59] via-[#ff8a6b] to-[#ffb09c] py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-2xl" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src="/images/pic1.jpeg"
                    alt={profileT("name")}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 256px, 320px"
                  />
                </div>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-2">
                {profileT("heading")}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {profileT("name")}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/90 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{profileT("constituency")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  <span>{profileT("elected")}</span>
                </div>
              </div>
              <p className="text-lg text-white/90 max-w-xl">
                {profileT("description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-900 -mt-8 relative z-20">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 -mt-16">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <Card 
                  key={index} 
                  className="bg-white dark:bg-slate-800 border-0 shadow-[0_10px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(255,122,89,0.25)] hover:-translate-y-2 transition-all duration-300 group"
                >
                  <CardContent className="p-6 text-center relative overflow-hidden">
                    {/* Decorative gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A59]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7A59] to-[#ff8a6b] text-white mb-4 shadow-lg shadow-[#FF7A59]/30 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-7 w-7" />
                      </div>
                      <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF7A59] to-[#e86a4a] bg-clip-text text-transparent">{achievement.value}</p>
                      <p className="text-sm text-muted-foreground mt-1 font-medium">{achievement.label}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              {locale === "hi" ? "जीवन परिचय" : "Biography"}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed text-center">
                {locale === "hi" 
                  ? "मनीष रावत एक समर्पित जन सेवक हैं जिन्होंने अपना जीवन निर्वाचन क्षेत्र के विकास और कल्याण के लिए समर्पित कर दिया है। बूथ स्तर के कार्यकर्ता से विधायक तक की उनकी यात्रा कड़ी मेहनत, समर्पण और जनता के प्रति प्रतिबद्धता का प्रमाण है।"
                  : "Manish Rawat is a dedicated public servant who has devoted his life to the development and welfare of his constituency. His journey from a booth-level worker to MLA is a testament to hard work, dedication, and commitment to the people."
                }
              </p>
              <p className="text-muted-foreground leading-relaxed text-center mt-4">
                {locale === "hi"
                  ? "शिक्षा, स्वास्थ्य, बुनियादी ढांचे और रोजगार पर विशेष ध्यान देते हुए, उन्होंने कई विकास परियोजनाओं का नेतृत्व किया है जिससे हजारों लोगों के जीवन में सुधार हुआ है।"
                  : "With a special focus on education, healthcare, infrastructure, and employment, he has led numerous development projects that have improved the lives of thousands of people."
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {locale === "hi" ? "राजनीतिक यात्रा" : "Political Journey"}
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#FF7A59]/30 transform md:-translate-x-1/2" />
              
              {careerMilestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-start gap-6 mb-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#FF7A59] rounded-full transform -translate-x-1/2 border-4 border-white dark:border-slate-900 shadow-lg z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}>
                    <Card className="border-0 bg-white dark:bg-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_rgba(255,122,89,0.15)] hover:-translate-y-1 transition-all duration-300">
                      <CardContent className="p-6">
                        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#FF7A59] to-[#ff8a6b] text-white text-sm font-bold rounded-full mb-3 shadow-md shadow-[#FF7A59]/30">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {locale === "hi" ? "हमारा उद्देश्य" : "Our Purpose"}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission */}
            <Card className="relative overflow-hidden border-0 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(255,122,89,0.2)] transition-all duration-300 hover:-translate-y-1 group">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A59] to-[#ff8a6b]" />
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
              <CardContent className="relative z-10 p-8 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium uppercase tracking-wider">
                      {locale === "hi" ? "हमारा" : "Our"}
                    </p>
                    <h3 className="text-2xl font-bold">
                      {locale === "hi" ? "मिशन" : "Mission"}
                    </h3>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed text-lg">
                  {locale === "hi"
                    ? "लोगों की सेवा करना और हमारे निर्वाचन क्षेत्र के विकास के लिए समर्पण के साथ काम करना। हर नागरिक की आवाज सुनना और उनकी समस्याओं का समाधान करना।"
                    : "To serve the people with dedication and work towards the development of our constituency. To listen to every citizen's voice and solve their problems."
                  }
                </p>
                {/* Decorative element */}
                <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-white/10 blur-xl" />
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="relative overflow-hidden border-2 border-[#FF7A59]/20 bg-white dark:bg-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(255,122,89,0.2)] hover:border-[#FF7A59]/40 transition-all duration-300 hover:-translate-y-1 group">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF7A59]/10 to-transparent" />
              <CardContent className="relative z-10 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF7A59] to-[#ff8a6b] flex items-center justify-center shadow-lg shadow-[#FF7A59]/30">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                      {locale === "hi" ? "हमारी" : "Our"}
                    </p>
                    <h3 className="text-2xl font-bold">
                      {locale === "hi" ? "दृष्टि" : "Vision"}
                    </h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {locale === "hi"
                    ? "एक समृद्ध और विकसित निर्वाचन क्षेत्र जहाँ हर नागरिक फलता-फूलता है। शिक्षा, स्वास्थ्य और रोजगार के अवसरों से भरपूर एक आदर्श समाज का निर्माण।"
                    : "A prosperous and developed constituency where every citizen thrives. Building an ideal society full of opportunities in education, healthcare, and employment."
                  }
                </p>
                {/* Decorative element */}
                <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-[#FF7A59]/5 blur-xl" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#FF7A59]">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {locale === "hi" ? "संपर्क में रहें" : "Get in Touch"}
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            {locale === "hi"
              ? "आपकी समस्याओं और सुझावों को सुनने के लिए हमेशा तैयार हूं। कृपया संपर्क करें।"
              : "I am always ready to listen to your problems and suggestions. Please get in touch."
            }
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF7A59] font-semibold rounded-full hover:bg-white/90 transition-colors shadow-lg hover:shadow-xl"
          >
            {locale === "hi" ? "संपर्क करें" : "Contact Us"}
          </a>
        </div>
      </section>
    </div>
  )
}
