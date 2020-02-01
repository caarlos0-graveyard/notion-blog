img:
	wget -O public/avatar.png https://github.com/caarlos0.png
	wget -O public/og-image.png "https://og.caarlos0.dev/Carlos%20Becker%20%7C%20**caarlos0**.png?theme=light&md=1&fontSize=100px&images=https://github.com/caarlos0.png"
	convert public/avatar.png \
		-bordercolor white -border 0 \
		\( -clone 0 -resize 16x16 \) \
		\( -clone 0 -resize 32x32 \) \
		\( -clone 0 -resize 48x48 \) \
		\( -clone 0 -resize 64x64 \) \
		-delete 0 -alpha off -colors 256 public/favicon.ico
	convert -resize x120 public/avatar.png public/apple-touch-icon.png
