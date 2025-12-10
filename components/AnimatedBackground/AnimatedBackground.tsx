import styles from "./AnimatedBackground.module.scss";

export default function AnimatedBackground() {
  const gradientClasses = [styles.g1, styles.g2, styles.g3, styles.g4, styles.g5];
  const totalGradients = 30;
  return (
    <div id="gradient-bg" className={styles.gradientBg}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" 
              result="goo" 
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={styles.gradientsContainer}>
        {Array.from({ length: totalGradients }, (_, i) => (
          <div key={i} className={gradientClasses[i % gradientClasses.length]}></div>
        ))}
      </div>
    </div>
  );
}