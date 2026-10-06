interface SkeletonProps {
    className?: string;
}

export function Skeleton(
    {
        className = ""
    } : SkeletonProps
) {
    return (
        <div
            className={`animate-pulse rounded-lg ${className}`}/>
    )
}



export function TableSkeleton() {
    return (

        <>

            <div
                className="flex-1 w-full min-h-60 rounded-lg bg-white flex flex-col items-start gap-4 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">

                <Skeleton className="w-24 h-8 bg-bf-primarytextlight/30" />
                <Skeleton className="w-full h-8 bg-[#FAF2EE]" />
                <Skeleton className="w-full h-8 bg-[#FAF2EE]" />
                <Skeleton className="w-full h-8 bg-[#FAF2EE]" />
                
            </div>

        </>
    )
}