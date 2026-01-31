'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  fill = false,
  width,
  height,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        onLoadingComplete={handleLoadingComplete}
        className={`${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-500`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        quality={85}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 1200}
      height={height || 800}
      priority={priority}
      onLoadingComplete={handleLoadingComplete}
      className={`${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-500`}
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
    />
  )
}
