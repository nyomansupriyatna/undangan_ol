import { useEffect, useRef } from "react";

export default function AutoScroll() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;

    const scrollInterval = setInterval(() => {
        container.scrollTop += 1; // kecepatan scroll
        if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
            container.scrollTop = 0; // ulang dari awal
        }
    }, 30); // delay scroll

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="h-64 overflow-hidden bg-gray-100 rounded-lg p-4 shadow-md"
    >
      <div className="space-y-4">
        <p className="text-lg">Item 1</p>
        <p className="text-lg">Item 2</p>
        <p className="text-lg">Item 3</p>
        <p className="text-lg">Item 4</p>
        <p className="text-lg">Item 5</p>
        <p className="text-lg">Item 6</p>
        <p className="text-lg">Item 7</p>
        <p className="text-lg">Item 8</p>
      </div>
    </div>
  );
}
