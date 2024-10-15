import { Express, Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { extname, join } from 'path'
import uniqueSlug from 'unique-slug'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: DestinationCallback
    ) => {
        cb(
            null,
            join(
                __dirname,
                process.env.UPLOAD_PATH_TEMP
                    ? `../public/${process.env.UPLOAD_PATH_TEMP}`
                    : '../public'
            )
        )
    },

    // Можно лучше: имя файла генерировать уникальное и не забывать про транслит русских символов, можно использовать сторонние бибилиотеки, например https://www.npmjs.com/package/slugify и https://www.npmjs.com/package/unique-slug
    filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback
    ) => {
        cb(
            null,
            `${uniqueSlug(new Date().toUTCString())}${extname(file.originalname)}`
        )
    },
})

const types = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
]
const MIN_FILE_SIZE = 2 * 1024 // 2KB в байтах
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB в байтах

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    console.log(file)

    if (!types.includes(file.mimetype)) {
        return cb(null, false)
    }

    if (file.size < MIN_FILE_SIZE) {
        return cb(null, false)
    }

    cb(null, true)
}

export default multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE },
})
