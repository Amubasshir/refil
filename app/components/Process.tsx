export default function Process() {
  const steps = [
    { title: "Compare Loans", description: "Use our AI-powered tool to compare multiple loan options instantly." },
    {
      title: "Apply Online",
      description: "Complete your application entirely online with our user-friendly interface.",
    },
    { title: "Get Approved", description: "Receive quick approval and start saving on your mortgage payments." },
  ]

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Re-financing Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-4">{index + 1}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

