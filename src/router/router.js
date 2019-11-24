import All from '../components/';
//通过components/Common下的index.js文件导入组件
import Common from '../components/Common';

const routes = [
    { path: '/', name: "home", component: All.Index },
    { path: '/login', component: All.Login },
    {
        path: '/index',
        component: All.Index,
        children: [{
                path: 'form/OverTimeBlue',
                component: All.Form.OverTimeBlue,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },{
                path: 'form/OverTimeBlueSheet',
                component: All.Form.OverTimeBlueSheet,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'OverTimeBlueReport',
                component: All.Form.OverTimeBlueReport
            },,
            {
                path: 'OverTimeBlueSheetReport',
                component: All.Form.OverTimeBlueSheetReport
            },{
                path: 'form/OverTimeWhiteSheet',
                component: All.Form.OverTimeWhiteSheet,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },{
                path: 'form/OverTimeWhiteSheets',
                component: All.Form.OverTimeWhiteSheets,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },{
                path: 'form/OverTimeWhite',
                component: All.Form.OverTimeWhite,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'OverTimeWhiteSheetReport',
                component: All.Form.OverTimeWhiteSheetReport
            },
            {
                path: 'OverTimeWhiteReport',
                component: All.Form.OverTimeWhiteReport
            },
            {
            path: 'form/TransportationApplication',
            component: All.Form.TransportationApplication,
            children: [
                { path: 'create', component: Common.Vform },
                { path: 'detail/:id', component: Common.DetailForm },
                { path: 'reAudit/:id', component: Common.ReSubmit },
                { path: 'audit/:id', component: Common.Suggest }
            ]
        },
        {
            path: 'TransportationApplicationReport',
            component: All.Form.TransportationApplicationReport
        },{
                path: 'form/ConstructionWorkPermit',
                component: All.Form.ConstructionWorkPermit,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'create/:cwp', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },{
                path: 'ConstructionWorkPermitReport',
                component: All.Form.ConstructionWorkPermitReport
            },{
                path: 'ConstructionWorkPermitReportCustom',
                component: All.Form.ConstructionWorkPermitReportCustom
            },{
                path: 'ConstructionWorkPermitMapReport',
                component: All.Form.ConstructionWorkPermitMapReport
            },{
                path: 'form/JobDescriptionApplication',
                component: All.Form.JobDescriptionApplication,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },{
                path: 'JobDescriptionApplicationReport',
                component: All.Form.JobDescriptionApplicationReport
            },{
                path: 'JobDescriptionApplicationReviewChange/:id',
                component: All.Form.JobDescriptionApplicationReviewChange,
                meta: {
                    title: 'Review Change Page'
                }
            },{
                path: 'form/EclosingApplication',
                component: All.Form.EclosingApplication,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'form/EclosingApplicationNew',
                component: All.Form.EclosingApplicationNew,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'EclosingApplicationReport',
                component: All.Form.EclosingApplicationReport
            },
            {
                path: 'EclosingApplicationPending',
                component: All.Form.EclosingApplicationPending
            },
			{
                path: 'form/ContractApprove',
                component: All.Form.ContractApprove,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
			{
                path: 'form/QuotationProcessApplication',
                component: All.Form.QuotationProcessApplication,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              },
              {
                path: 'QuotationProcessApplicationReport',
                component: All.Form.QuotationProcessApplicationReport,
              },
            {
                path: 'form/ContractExtension',
                component: All.Form.ContractExtension,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'ContractExtensionInitial',
                component: All.Form.ContractExtensionInitial
            },
            {
                path: 'ContractExtensionReport',
                component: All.Form.ContractExtensionReport
            },
            {
                path: 'form/TeamBuilding',
                component: All.Form.TeamBuilding,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'TeamBuildingReport',
                component: All.Form.TeamBuildingReport
            },
            {
                path: 'TeamBuildingPersonReport',
                component: All.Form.TeamBuildingPersonReport
            },
            {
                path: 'TeamBuildingDeptReport',
                component: All.Form.TeamBuildingDeptReport
            },
			{
                path: 'form/HrPePoAppraisal',
                component: All.Form.HrPePoAppraisal,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              }
            ,
            {
                path: 'HrPePoAppraisalReport',
                component: All.Form.HrPePoAppraisalReport
            },
            {
                path: 'form/Travel',
                component: All.Form.Travel,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'form/ShareFolder',
                component: All.Form.ShareFolder,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'ShareFolderReport',
                component: All.Form.ShareFolderReport
            },
			{
                path: 'WifiAccountReport',
                component: All.Form.WifiAccountReport
            },
            {
                path: 'form/WifiAccount',
                component: All.Form.WifiAccount,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'form/LongTermVisitCard',
                component: All.Form.LongTermVisitCard,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'LongTermVisitCardReport',
                component: All.Form.LongTermVisitCardReport
            },
            {
                path: 'form/LocalPcAdmin',
                component: All.Form.LocalPcAdmin,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'LocalPcAdminReport',
                component: All.Form.LocalPcAdminReport
            },
            {
                path: 'form/CoiMain',
                component: All.Form.CoiMain,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'CoiMainReport',
                component: All.Form.CoiMainReport
            },
            {
                path: 'form/FolderPathMGT',
                component: All.Form.FolderPathMGT.FolderPathMGT,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'form/FolderPathEdit',
                component: All.Form.FolderPathMGT.FolderPathEdit,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.Vform },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'form/ItSystemAccount',
                component: All.Form.ItSystemAccount,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'ItSystemAccountReport',
                component: All.Form.ItSystemAccountReport
            },
            {
                path: 'ItSystemResource',
                component: All.Form.ItSystemResource
            },
            {
                path: 'PurchaseProject',
                component: All.Form.PurchaseProject
            },
            {
                path: 'form/BuSupplierRecommendation',
                component: All.Form.BuSupplierRecommendation,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'BuSupplierRecommendationReport',
                component: All.Form.BuSupplierRecommendationReport
            },
            {
                path: 'form/RequestForQuotationst',
                component: All.Form.RequestForQuotationst,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'RequestForQuotationstReport',
                component: All.Form.RequestForQuotationstReport
            },
            {
                path: 'WasteCategory',
                component: All.Form.WasteCategory
            },
            {
                path: 'form/WasteDisposal',
                component: All.Form.WasteDisposal,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'WasteDisposalReport',
                component: All.Form.WasteDisposalReport
            },
            {
                path: 'HotelInfo',
                component: All.Form.HotelInfo
            },
            {
                path: 'form/FurnitureNew',
                component: All.Form.FurnitureNew,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'form/KvsAccessGenerator',
                component: All.Form.KvsAccessGenerator,
                children: [
                    { path: 'create', component: Common.VformAndPrint },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'KVSAccessAdmin',
                component: All.Form.KVSAccessAdmin,
               
            },    
            {
                path: 'KvsAccessGeneratorReport',
                component: All.Form.KvsAccessGeneratorReport,
               
            },                    
            {
                path: 'FurnitureNewReport',
                component: All.Form.FurnitureNewReport,
               
            },
            {
                path: 'FurnitureAdmin',
                component: All.Form.FurnitureAdmin,
               
            },
            {
                path: 'form/BusinessTravel',
                component: All.Form.BusinessTravel,
                children: [
                    { path: 'create', component: Common.Vform },
                    { path: 'detail/:id', component: Common.DetailForm },
                    { path: 'reAudit/:id', component: Common.ReSubmit },
                    { path: 'audit/:id', component: Common.Suggest }
                ]
            },
            {
                path: 'form/BmApplication',
                component: All.Form.BmApplication,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              },
              {
                path: 'BmApplicationReport',
                component: All.Form.BmApplicationReport,
               
              },
              {
                path: 'form/WorkPlace',
                component: All.Form.WorkPlace,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              },
              {
                path: 'WorkPlaceReport',
                component: All.Form.WorkPlaceReport,
               
              },
              {
                path: 'form/HrAttendanceDeviation',
                component: All.Form.HrAttendanceDeviation,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              },
              {
                path: 'HrAttendanceDeviationReport',
                component: All.Form.HrAttendanceDeviationReport,
               
              },
              {
                path: 'form/CompanyCar',
                component: All.Form.CompanyCar,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              },
              {
                path: 'CompanyCarReport',
                component: All.Form.CompanyCarReport,
               
              },
              {
                path: 'form/CarMaintainAndAccident',
                component: All.Form.CarMaintainAndAccident,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              },
              {
                path: 'CarMaintainAndAccidentReport',
                component: All.Form.CarMaintainAccidentReport,
              },
              {
                path: 'form/FixedAssetTransfer',
                component: All.Form.FixedAssetTransfer,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              },
              {
                path: 'FixedAssetTransferReport',
                component: All.Form.FixedAssetTransferReport,
              },
              {
                path: 'form/FixedAssetRetirement',
                component: All.Form.FixedAssetRetirement,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              },
              {
                path: 'FixedAssetRetirementReport',
                component: All.Form.FixedAssetRetirementReport,
              },
              {
                path: 'form/FixedAssetAcquisition',
                component: All.Form.FixedAssetAcquisition,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              },
              {
                path: 'FixedAssetAcquisitionReport',
                component: All.Form.FixedAssetAcquisitionReport,
              },
              {
                path: 'FixedAssetAcquisitionUpload',
                component: All.Form.FixedAssetAcquisitionUpload,
              },
	      {
                path: 'form/PhotoPermit',
                component: All.Form.PhotoPermit,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              },
              {
                path: 'PhotoPermitReport',
                component: All.Form.PhotoPermitReport,
               
              },
              {
                path: 'WpEmployeeStandard',
                component: All.Form.WpEmployeeStandard,
               
              },
            {
                path: 'BusinessTravelReport',
                component: All.Form.BusinessTravelReport
            },
            {
                path: 'Dictionary',
                component: All.Form.Dictionary
            },
            {
                path: 'CommonProcess',
                component: All.Form.CommonProcess
            },
            {
                path: 'CompanyCarMge',
                component: All.Form.CompanyCarMge
            },
            {
                path: 'StandardDevice',
                component: All.Form.StandardDevice
            },
            {
                path: 'ItcpEmset',
                component: All.Form.ItcpEmset
            },
            {
                path: 'form/ItcpCompanyPhone',
                component: All.Form.ItcpCompanyPhone,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              }
            ,
            {
                path: 'ItcpCompanyPhoneReport',
                component: All.Form.ItcpCompanyPhoneReport
            },
            {
                path: 'UserDeviceInfo',
                component: All.Form.UserDeviceInfo
            },
            {
                path: 'SignatureUserDevice',
                component: All.Form.SignatureUserDevice
            },
            {
                path: 'form/HrUalCarryover',
                component: All.Form.HrUalCarryover,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              }
            ,
            {
                path: 'HrUalCarryoverReport',
                component: All.Form.HrUalCarryoverReport
            },
            {
                path: 'TriggerTimed',
                component: All.Form.TriggerTimed
            },
            { path: 'task', component: All.Task },
            { path: 'cePermitTask', component: All.CePermitTask },
            { path: 'application', component: All.Application },
            {
                path: 'form/HrTraining',
                component: All.Form.HrTraining,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              }
            ,
            {
                path: 'HrTrainingReport',
                component: All.Form.HrTrainingReport
            },
            {
                path: 'form/HrTrainingCancel',
                component: All.Form.HrTrainingCancel,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              }
            ,
            {
                path: 'HrTrainingCancelReport',
                component: All.Form.HrTrainingCancelReport
            },
            {
                path: 'form/WorkCertificate',
                component: All.Form.WorkCertificate,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              }
            ,
            {
                path: 'WorkCertificateReport',
                component: All.Form.WorkCertificateReport
            },
            {
                path: 'form/BusinessCard',
                component: All.Form.BusinessCard,
                children: [
                  { path: 'create', component: Common.Vform },
                  { path: 'detail/:id', component: Common.DetailForm },
                  { path: 'reAudit/:id', component: Common.ReSubmit },
                  { path: 'audit/:id', component: Common.Suggest }
                ]
              }
            ,
            {
                path: 'BusinessCardReport',
                component: All.Form.BusinessCardReport
            },
        ]
    },
];

export default routes;