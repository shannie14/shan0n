import LayloSmsForm from "../components/LayloForm"


export default function Home() {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FFF8E7]">
        <div className="text-3xl font-bold mb-6 text-center">
          Join our SMS list
        </div>
        <LayloSmsForm />
      </main>
    );
  }