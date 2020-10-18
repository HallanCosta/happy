import { Image } from '../models/Image';

export const imagesView = {
  render(image: Image) {
    return {
      id: image.id,
      url: `${process.env.IMAGES_SERVER_DIRECTORY}${image.path}`
    }
  },
  renderMany(images: Image[]) {
    return images.map(image => this.render(image));
  }
}