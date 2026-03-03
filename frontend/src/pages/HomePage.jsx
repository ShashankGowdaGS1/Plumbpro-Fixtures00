import { Hero } from "../components/home/Hero";
import { CategoryStrip } from "../components/home/CategoryStrip";
import { FeaturedProducts } from "../components/home/FeaturedProducts";

export default function HomePage() {
    return (
        <>
            <Hero />
            <CategoryStrip />
            <FeaturedProducts />
        </>
    )
}