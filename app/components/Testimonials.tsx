import { Card, CardContent } from "@/components/ui/card"

export default function Testimonials() {
  const testimonials = [
    { initials: "JD", name: "John Doe", quote: "Refii made refinancing my mortgage a breeze. I saved $300 a month!" },
    { initials: "JS", name: "Jane Smith", quote: "The process was so simple, and the customer support was excellent." },
    {
      initials: "MJ",
      name: "Mike Johnson",
      quote: "I couldn't believe how quick and easy it was to refinance with Refii.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {testimonial.initials}
              </div>
              <h3 className="text-lg font-semibold mb-2">{testimonial.name}</h3>
              <p className="italic">"{testimonial.quote}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

