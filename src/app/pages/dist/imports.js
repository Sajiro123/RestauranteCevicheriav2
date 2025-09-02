"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImportsModule = void 0;
// Import PrimeNG modules
var accordion_1 = require("primeng/accordion");
var autocomplete_1 = require("primeng/autocomplete");
var avatar_1 = require("primeng/avatar");
var avatargroup_1 = require("primeng/avatargroup");
var badge_1 = require("primeng/badge");
var breadcrumb_1 = require("primeng/breadcrumb");
var button_1 = require("primeng/button");
var buttongroup_1 = require("primeng/buttongroup");
var calendar_1 = require("primeng/calendar");
var carousel_1 = require("primeng/carousel");
var cascadeselect_1 = require("primeng/cascadeselect");
var chart_1 = require("primeng/chart");
var checkbox_1 = require("primeng/checkbox");
var chip_1 = require("primeng/chip");
var confirmdialog_1 = require("primeng/confirmdialog");
var confirmpopup_1 = require("primeng/confirmpopup");
var colorpicker_1 = require("primeng/colorpicker");
var contextmenu_1 = require("primeng/contextmenu");
var dataview_1 = require("primeng/dataview");
var dialog_1 = require("primeng/dialog");
var divider_1 = require("primeng/divider");
var dock_1 = require("primeng/dock");
var dragdrop_1 = require("primeng/dragdrop");
var dropdown_1 = require("primeng/dropdown");
var dynamicdialog_1 = require("primeng/dynamicdialog");
var defer_1 = require("primeng/defer");
var editor_1 = require("primeng/editor");
var fieldset_1 = require("primeng/fieldset");
var fileupload_1 = require("primeng/fileupload");
var focustrap_1 = require("primeng/focustrap");
var galleria_1 = require("primeng/galleria");
var inplace_1 = require("primeng/inplace");
var inputmask_1 = require("primeng/inputmask");
var inputswitch_1 = require("primeng/inputswitch");
var inputtext_1 = require("primeng/inputtext");
var inputnumber_1 = require("primeng/inputnumber");
var inputgroupaddon_1 = require("primeng/inputgroupaddon");
var inputgroup_1 = require("primeng/inputgroup");
var inputotp_1 = require("primeng/inputotp");
var image_1 = require("primeng/image");
var knob_1 = require("primeng/knob");
var listbox_1 = require("primeng/listbox");
var megamenu_1 = require("primeng/megamenu");
var menu_1 = require("primeng/menu");
var menubar_1 = require("primeng/menubar");
var message_1 = require("primeng/message");
var messages_1 = require("primeng/messages");
var multiselect_1 = require("primeng/multiselect");
var metergroup_1 = require("primeng/metergroup");
var orderlist_1 = require("primeng/orderlist");
var organizationchart_1 = require("primeng/organizationchart");
var overlaypanel_1 = require("primeng/overlaypanel");
var paginator_1 = require("primeng/paginator");
var panel_1 = require("primeng/panel");
var panelmenu_1 = require("primeng/panelmenu");
var password_1 = require("primeng/password");
var picklist_1 = require("primeng/picklist");
var progressbar_1 = require("primeng/progressbar");
var radiobutton_1 = require("primeng/radiobutton");
var rating_1 = require("primeng/rating");
var scroller_1 = require("primeng/scroller");
var scrollpanel_1 = require("primeng/scrollpanel");
var scrolltop_1 = require("primeng/scrolltop");
var selectbutton_1 = require("primeng/selectbutton");
var sidebar_1 = require("primeng/sidebar");
var skeleton_1 = require("primeng/skeleton");
var slider_1 = require("primeng/slider");
var speeddial_1 = require("primeng/speeddial");
var splitbutton_1 = require("primeng/splitbutton");
var splitter_1 = require("primeng/splitter");
var stepper_1 = require("primeng/stepper");
var steps_1 = require("primeng/steps");
var tabmenu_1 = require("primeng/tabmenu");
var table_1 = require("primeng/table");
var tabview_1 = require("primeng/tabview");
var tag_1 = require("primeng/tag");
var terminal_1 = require("primeng/terminal");
var tieredmenu_1 = require("primeng/tieredmenu");
var timeline_1 = require("primeng/timeline");
var toast_1 = require("primeng/toast");
var togglebutton_1 = require("primeng/togglebutton");
var popover_1 = require("primeng/popover");
var toolbar_1 = require("primeng/toolbar");
var tooltip_1 = require("primeng/tooltip");
var tree_1 = require("primeng/tree");
var treeselect_1 = require("primeng/treeselect");
var treetable_1 = require("primeng/treetable");
var animateonscroll_1 = require("primeng/animateonscroll");
var card_1 = require("primeng/card");
var blockui_1 = require("primeng/blockui");
var progressspinner_1 = require("primeng/progressspinner");
var ripple_1 = require("primeng/ripple");
var floatlabel_1 = require("primeng/floatlabel");
var iconfield_1 = require("primeng/iconfield");
var inputicon_1 = require("primeng/inputicon");
var styleclass_1 = require("primeng/styleclass");
var autofocus_1 = require("primeng/autofocus");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var fluid_1 = require("primeng/fluid");
var select_1 = require("primeng/select");
var datepicker_1 = require("primeng/datepicker");
var toggleswitch_1 = require("primeng/toggleswitch");
var textarea_1 = require("primeng/textarea");
var ImportsModule = /** @class */ (function () {
    function ImportsModule() {
    }
    ImportsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                inputtext_1.InputTextModule,
                button_1.ButtonModule,
                checkbox_1.CheckboxModule,
                radiobutton_1.RadioButtonModule,
                selectbutton_1.SelectButtonModule,
                inputgroup_1.InputGroupModule,
                fluid_1.FluidModule,
                iconfield_1.IconFieldModule,
                inputicon_1.InputIconModule,
                floatlabel_1.FloatLabelModule,
                autocomplete_1.AutoCompleteModule,
                inputnumber_1.InputNumberModule,
                slider_1.SliderModule,
                rating_1.RatingModule,
                colorpicker_1.ColorPickerModule,
                knob_1.KnobModule,
                select_1.SelectModule,
                datepicker_1.DatePickerModule,
                togglebutton_1.ToggleButtonModule,
                popover_1.PopoverModule,
                toggleswitch_1.ToggleSwitchModule,
                treeselect_1.TreeSelectModule,
                multiselect_1.MultiSelectModule,
                listbox_1.ListboxModule,
                inputgroupaddon_1.InputGroupAddonModule,
                textarea_1.TextareaModule,
                avatar_1.AvatarModule,
                avatargroup_1.AvatarGroupModule,
                animateonscroll_1.AnimateOnScrollModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                accordion_1.AccordionModule,
                autocomplete_1.AutoCompleteModule,
                badge_1.BadgeModule,
                breadcrumb_1.BreadcrumbModule,
                blockui_1.BlockUIModule,
                buttongroup_1.ButtonGroupModule,
                calendar_1.CalendarModule,
                carousel_1.CarouselModule,
                cascadeselect_1.CascadeSelectModule,
                chart_1.ChartModule,
                checkbox_1.CheckboxModule,
                chip_1.ChipModule,
                colorpicker_1.ColorPickerModule,
                confirmdialog_1.ConfirmDialogModule,
                confirmpopup_1.ConfirmPopupModule,
                contextmenu_1.ContextMenuModule,
                dataview_1.DataViewModule,
                dialog_1.DialogModule,
                divider_1.DividerModule,
                dock_1.DockModule,
                dragdrop_1.DragDropModule,
                dropdown_1.DropdownModule,
                dynamicdialog_1.DynamicDialogModule,
                defer_1.DeferModule,
                editor_1.EditorModule,
                fieldset_1.FieldsetModule,
                fileupload_1.FileUploadModule,
                focustrap_1.FocusTrapModule,
                galleria_1.GalleriaModule,
                inplace_1.InplaceModule,
                inputmask_1.InputMaskModule,
                inputswitch_1.InputSwitchModule,
                inputtext_1.InputTextModule,
                inputnumber_1.InputNumberModule,
                inputgroup_1.InputGroupModule,
                inputgroupaddon_1.InputGroupAddonModule,
                inputotp_1.InputOtpModule,
                image_1.ImageModule,
                knob_1.KnobModule,
                listbox_1.ListboxModule,
                megamenu_1.MegaMenuModule,
                menu_1.MenuModule,
                menubar_1.MenubarModule,
                message_1.MessageModule,
                messages_1.MessagesModule,
                multiselect_1.MultiSelectModule,
                metergroup_1.MeterGroupModule,
                organizationchart_1.OrganizationChartModule,
                orderlist_1.OrderListModule,
                overlaypanel_1.OverlayPanelModule,
                paginator_1.PaginatorModule,
                panel_1.PanelModule,
                panelmenu_1.PanelMenuModule,
                password_1.PasswordModule,
                picklist_1.PickListModule,
                progressspinner_1.ProgressSpinnerModule,
                progressbar_1.ProgressBarModule,
                radiobutton_1.RadioButtonModule,
                rating_1.RatingModule,
                selectbutton_1.SelectButtonModule,
                sidebar_1.SidebarModule,
                scroller_1.ScrollerModule,
                scrollpanel_1.ScrollPanelModule,
                scrolltop_1.ScrollTopModule,
                skeleton_1.SkeletonModule,
                slider_1.SliderModule,
                speeddial_1.SpeedDialModule,
                splitter_1.SplitterModule,
                stepper_1.StepperModule,
                splitbutton_1.SplitButtonModule,
                steps_1.StepsModule,
                table_1.TableModule,
                tabmenu_1.TabMenuModule,
                tabview_1.TabViewModule,
                tag_1.TagModule,
                terminal_1.TerminalModule,
                tieredmenu_1.TieredMenuModule,
                timeline_1.TimelineModule,
                toast_1.ToastModule,
                togglebutton_1.ToggleButtonModule,
                popover_1.PopoverModule,
                toolbar_1.ToolbarModule,
                tooltip_1.TooltipModule,
                tree_1.TreeModule,
                treeselect_1.TreeSelectModule,
                treetable_1.TreeTableModule,
                card_1.CardModule,
                ripple_1.RippleModule,
                styleclass_1.StyleClassModule,
                iconfield_1.IconFieldModule,
                inputicon_1.InputIconModule,
                autofocus_1.AutoFocusModule
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                inputtext_1.InputTextModule,
                button_1.ButtonModule,
                checkbox_1.CheckboxModule,
                radiobutton_1.RadioButtonModule,
                selectbutton_1.SelectButtonModule,
                inputgroup_1.InputGroupModule,
                fluid_1.FluidModule,
                iconfield_1.IconFieldModule,
                inputicon_1.InputIconModule,
                floatlabel_1.FloatLabelModule,
                autocomplete_1.AutoCompleteModule,
                inputnumber_1.InputNumberModule,
                slider_1.SliderModule,
                rating_1.RatingModule,
                colorpicker_1.ColorPickerModule,
                knob_1.KnobModule,
                select_1.SelectModule,
                datepicker_1.DatePickerModule,
                togglebutton_1.ToggleButtonModule,
                popover_1.PopoverModule,
                toggleswitch_1.ToggleSwitchModule,
                treeselect_1.TreeSelectModule,
                multiselect_1.MultiSelectModule,
                listbox_1.ListboxModule,
                inputgroupaddon_1.InputGroupAddonModule,
                textarea_1.TextareaModule,
                avatar_1.AvatarModule,
                avatargroup_1.AvatarGroupModule,
                animateonscroll_1.AnimateOnScrollModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                accordion_1.AccordionModule,
                autocomplete_1.AutoCompleteModule,
                badge_1.BadgeModule,
                breadcrumb_1.BreadcrumbModule,
                blockui_1.BlockUIModule,
                buttongroup_1.ButtonGroupModule,
                calendar_1.CalendarModule,
                carousel_1.CarouselModule,
                cascadeselect_1.CascadeSelectModule,
                chart_1.ChartModule,
                checkbox_1.CheckboxModule,
                chip_1.ChipModule,
                colorpicker_1.ColorPickerModule,
                confirmdialog_1.ConfirmDialogModule,
                confirmpopup_1.ConfirmPopupModule,
                contextmenu_1.ContextMenuModule,
                dataview_1.DataViewModule,
                dialog_1.DialogModule,
                divider_1.DividerModule,
                defer_1.DeferModule,
                dock_1.DockModule,
                dragdrop_1.DragDropModule,
                dropdown_1.DropdownModule,
                dynamicdialog_1.DynamicDialogModule,
                editor_1.EditorModule,
                fieldset_1.FieldsetModule,
                fileupload_1.FileUploadModule,
                focustrap_1.FocusTrapModule,
                galleria_1.GalleriaModule,
                inplace_1.InplaceModule,
                inputmask_1.InputMaskModule,
                inputswitch_1.InputSwitchModule,
                inputtext_1.InputTextModule,
                inputnumber_1.InputNumberModule,
                inputgroup_1.InputGroupModule,
                inputgroupaddon_1.InputGroupAddonModule,
                inputotp_1.InputOtpModule,
                image_1.ImageModule,
                knob_1.KnobModule,
                listbox_1.ListboxModule,
                megamenu_1.MegaMenuModule,
                menu_1.MenuModule,
                menubar_1.MenubarModule,
                message_1.MessageModule,
                messages_1.MessagesModule,
                multiselect_1.MultiSelectModule,
                metergroup_1.MeterGroupModule,
                organizationchart_1.OrganizationChartModule,
                orderlist_1.OrderListModule,
                overlaypanel_1.OverlayPanelModule,
                paginator_1.PaginatorModule,
                panel_1.PanelModule,
                panelmenu_1.PanelMenuModule,
                password_1.PasswordModule,
                picklist_1.PickListModule,
                progressspinner_1.ProgressSpinnerModule,
                progressbar_1.ProgressBarModule,
                radiobutton_1.RadioButtonModule,
                rating_1.RatingModule,
                selectbutton_1.SelectButtonModule,
                sidebar_1.SidebarModule,
                scroller_1.ScrollerModule,
                scrollpanel_1.ScrollPanelModule,
                scrolltop_1.ScrollTopModule,
                skeleton_1.SkeletonModule,
                slider_1.SliderModule,
                speeddial_1.SpeedDialModule,
                splitter_1.SplitterModule,
                stepper_1.StepperModule,
                splitbutton_1.SplitButtonModule,
                steps_1.StepsModule,
                table_1.TableModule,
                tabmenu_1.TabMenuModule,
                tabview_1.TabViewModule,
                tag_1.TagModule,
                terminal_1.TerminalModule,
                tieredmenu_1.TieredMenuModule,
                timeline_1.TimelineModule,
                toast_1.ToastModule,
                togglebutton_1.ToggleButtonModule,
                popover_1.PopoverModule,
                toolbar_1.ToolbarModule,
                tooltip_1.TooltipModule,
                tree_1.TreeModule,
                treeselect_1.TreeSelectModule,
                treetable_1.TreeTableModule,
                card_1.CardModule,
                ripple_1.RippleModule,
                styleclass_1.StyleClassModule,
                floatlabel_1.FloatLabelModule,
                iconfield_1.IconFieldModule,
                inputicon_1.InputIconModule,
                autofocus_1.AutoFocusModule
            ],
            providers: []
        })
    ], ImportsModule);
    return ImportsModule;
}());
exports.ImportsModule = ImportsModule;
