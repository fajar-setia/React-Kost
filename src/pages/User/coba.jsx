import 'animate.css';

export default function CardBookingList({ isVisible }) {
  const cards = Array(6).fill({
    title: "Booking Info",
    text: "Data pemesanan akan muncul di sini"
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-20">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-white p-6 rounded-lg shadow-lg animate__animated ${
            isVisible ? 'animate__fadeOutDown' : 'animate__fadeInUp'
          }`}
          style={{
            animationDuration: '1s',
            animationDelay: `${index * 0.2}s`, // delay per kartu
            animationFillMode: 'both' // biar tetap terlihat setelah animasi selesai
          }}
        >
          <h2 className="text-lg font-bold">{card.title}</h2>
          <p>{card.text}</p>
        </div>
      ))}
    </div>
  );
}

