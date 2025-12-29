export function useAspectRatio(projects) {
  const [ratios, setRatios] = useState({});

  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.onload = () => {
        setRatios((prev) => ({ ...prev, [p.id]: img.width / img.height }));
      };
      img.src = p.thumbnail;
    });
  }, [projects]);

  return ratios;
}