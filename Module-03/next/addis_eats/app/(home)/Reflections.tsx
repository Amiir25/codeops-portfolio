import { FaStar } from "react-icons/fa6";

// Guest reflections data
const reflections = [
  {
    id: 1,
    text: "The Doro Wat was so reminiscent of my grandmother's cooking in Gondar. The berbere depth and the slow-simmered onion sweet finish are impossible to find elsewhere.",
    guest: "Amanuel Mengistu",
    info: "Bole Resident & Food Patron",
    profile: "AM",
    profileColor: "bg-brand/20 text-brand",
  },
  {
    id: 2,
    text: "Their Fasting Beyaynetu is unmatched on Wednesdays. 12 vibrant dishes, and the Shiro tagamino came out bubbling in clay. True culinary devotion.",
    guest: "Sara Tesfaye",
    info: "Plant-Based Dining Advocate",
    profile: "ST",
    profileColor: "bg-green-900/20 text-green-900",
  },
  {
    id: 3,
    text: "We hosted a 10-person family reunion around their large handcrafted mesobs. The coffee ceremony with fresh frankincense made the evening unforgettable.",
    guest: "Dr. Kebede Wolde",
    info: "Diaspora Homecoming Guest",
    profile: "DK",
    profileColor: "bg-yellow-900/20 text-yellow-900",
  },
];

const Reflections = () => {
  return (
    <section className="mt-18">
      <p className="text-dark-red text-[10px] md:text-sm text-center">
        VOICES AROUND MESOB
      </p>
      <h1 className="text-3xl font-bold mt-2 text-center">
        Honored Guest Reflections
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {reflections.map((ref) => {
          const { id, text, guest, info, profile, profileColor } = ref;
          return (
            <div key={id} className="bg-light-red px-4 py-2 rounded">
              <p className="flex items-center text-dark-yellow">
                {[1, 2, 3, 4, 5].map((n) => (
                  <FaStar key={n} />
                ))}
              </p>
              <p className="text-sm italic mt-2">"{text}"</p>
              <div className="flex items-center gap-2 mt-2">
                <p
                  className={`${profileColor} w-10 h-10 rounded-full flex items-center justify-center font-semibold`}
                >
                  {profile}
                </p>
                <div>
                  <h3 className="font-bold">{guest}</h3>
                  <p className="text-xs">{info}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Reflections;