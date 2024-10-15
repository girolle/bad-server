import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export function serveStatic(baseDir: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        // Определяем полный путь к запрашиваемому файлу
        const filePath = path.join(baseDir, req.path)

        // Здесь мы убираем проверку, что файл находится в пределах baseDir
        // if (!filePath.startsWith(path.resolve(baseDir))) {
        //   return next(new NotFoundError('Файл не найден'));
        // }
        // Проверяем, существует ли файл
        fs.access(filePath, fs.constants.F_OK, (accessErr) => {
            if (accessErr) {
                // Файл не существует отдаем дальше мидлварам
                return next()
            }

            // Файл существует, отправляем его клиенту
            res.sendFile(filePath, (sendErr) => {
                console.log('err', sendErr)
                if (sendErr) {
                    next(sendErr)
                }
            })
        })
    }
}
