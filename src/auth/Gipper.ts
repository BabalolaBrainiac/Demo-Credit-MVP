const GipperAuthentication = {
    async validateServiceToken(req: any, res: any, next: any) {
        let serviceId = process.env.SErviceId
        let payload = process.env
        let permissions = []

    },

    async generateServiceToken(payload: GipperPayload) {
        let serviceId = process.env.ServiceId

    }

}

export interface GipperPayload {
    serviceId: string,
    permissions: string[],
    payload: any

}