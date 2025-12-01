
import FadeIn from "./fadeIn"
import FadeInLeft from "./fadeInLeft"

export default function Home() {
  return (
    <div className="space-y-10 p-10 h-[200vh]">
      
      <FadeIn>
        <div className="p-6 bg-blue-200 rounded-xl">Section 1</div>
      </FadeIn>

      <FadeIn duration={3} y={0} x={-100} rotate={[30,-30, 20, -20, 10, -10, 0]}>
        <div className="p-6 bg-green-200 rounded-xl">Section 2 (lebih jauh & lebih lambat)</div>
      </FadeIn>

      <FadeInLeft delay={0.3} y={30} x={0}>
        <div className="p-6 bg-purple-200 rounded-xl">Section 3 (delay)</div>
      </FadeInLeft>

    </div>
  );
}
